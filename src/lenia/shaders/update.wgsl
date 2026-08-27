// Lenia update step: kernel convolution + growth + Euler integration.
//
//   A(t+dt) = clip( A(t) + dt * G( K * A(t) ), 0, 1 )
//
// One invocation per cell. Each workgroup cooperatively stages its 16x16 tile
// plus a halo of radius R into workgroup memory, so the taps every cell needs
// are read from shared memory rather than re-read from VRAM by each thread
// independently. At R=13 a workgroup stages 42x42 = 1764 floats and then serves
// 256 cells x 529 taps = 135k reads from them: a 77x cut in global traffic.

struct Params {
    grid     : vec2<u32>,
    radius   : i32,
    dt       : f32,
    mu       : f32,
    sigma    : f32,
    growthFn : u32,   // 0 = polynomial (Chan gn=1), 1 = gaussian (Chan gn=2)
    decay    : f32,   // trail persistence per step; 0 disables the trail
};

@group(0) @binding(0) var<uniform>              params : Params;
@group(0) @binding(1) var<storage, read>        src    : array<vec2<f32>>;
@group(0) @binding(2) var<storage, read_write>  dst    : array<vec2<f32>>;
@group(0) @binding(3) var<storage, read>        kern   : array<f32>;

const TILE  : u32 = 16u;
const RMAX  : i32 = 20;                 // largest radius the halo is sized for
const SPAN  : u32 = 56u;                // TILE + 2 * RMAX
const HALO : u32 = 3136u;              // SPAN * SPAN, 12.25 KB of f32

var<workgroup> halo : array<f32, HALO>;

fn wrapIndex(v : i32, n : i32) -> i32 {
    return ((v % n) + n) % n;           // WGSL % keeps the sign of the dividend
}

fn growth(u : f32) -> f32 {
    let d = u - params.mu;
    if (params.growthFn == 0u) {
        // Polynomial "quad4", Chan gn=1. Compact support.
        let q  = max(0.0, 1.0 - (d * d) / (9.0 * params.sigma * params.sigma));
        let q2 = q * q;
        return q2 * q2 * 2.0 - 1.0;
    }
    if (params.growthFn == 2u) {
        // Step, Chan gn=3. Hard edges; used by a handful of species.
        return select(-1.0, 1.0, abs(d) <= params.sigma);
    }
    // Gaussian, Chan gn=2.
    return exp(-(d * d) / (2.0 * params.sigma * params.sigma)) * 2.0 - 1.0;
}

@compute @workgroup_size(16, 16)
fn main(
    @builtin(global_invocation_id) gid : vec3<u32>,
    @builtin(local_invocation_id)  lid : vec3<u32>,
    @builtin(workgroup_id)         wid : vec3<u32>,
) {
    let W = i32(params.grid.x);
    let H = i32(params.grid.y);
    let R = params.radius;
    let span = i32(TILE) + 2 * R;

    // Grid-space origin of this workgroup's halo region.
    let ox = i32(wid.x * TILE) - R;
    let oy = i32(wid.y * TILE) - R;

    // Cooperative staging. 256 threads stride over span*span cells, so the
    // work splits evenly no matter how R relates to the tile size.
    let total = u32(span * span);
    let tid   = lid.y * TILE + lid.x;
    for (var i = tid; i < total; i = i + TILE * TILE) {
        let sx = i32(i % u32(span));
        let sy = i32(i / u32(span));
        let gx = wrapIndex(ox + sx, W);     // toroidal boundary
        let gy = wrapIndex(oy + sy, H);
        halo[i] = src[u32(gy * W + gx)].x;
    }

    // Every invocation reaches this, including out-of-range ones below.
    workgroupBarrier();

    let x = i32(gid.x);
    let y = i32(gid.y);
    if (x >= W || y >= H) {
        return;
    }

    let k  = 2 * R + 1;
    let bx = i32(lid.x) + R;                // this cell's centre within the halo
    let by = i32(lid.y) + R;

    // The kernel is zero outside the disc of radius R, so bound each row to the
    // circle instead of walking the full (2R+1)^2 square. Exact, not an
    // approximation: every tap dropped had weight zero. At R=13 this scans 529
    // taps instead of 729, a measured 27% saving. The 2R+1 sqrt calls are
    // trivial next to that.
    let r2 = f32(R * R);
    var acc = 0.0;
    for (var dy = -R; dy <= R; dy = dy + 1) {
        let half = i32(sqrt(max(0.0, r2 - f32(dy * dy))));
        let rowHalo  = (by + dy) * span;
        let rowKernel = (dy + R) * k;
        for (var dx = -half; dx <= half; dx = dx + 1) {
            acc = acc + halo[u32(rowHalo + bx + dx)] * kern[u32(rowKernel + dx + R)];
        }
    }

    let idx  = u32(y * W + x);
    let prev = src[idx];
    let a    = clamp(prev.x + params.dt * growth(acc), 0.0, 1.0);

    // .x is the live state, .y a decaying trail so dying cells fade instead of
    // popping out. Each invocation touches only its own index, so no race.
    dst[idx] = vec2<f32>(a, max(a, prev.y * params.decay));
}
