// Visualisation pass. Reads the simulation state buffer directly and maps
// density onto the site's warm palette. Fully decoupled from the compute pass:
// it never writes simulation state, and the grid is sampled toroidally so the
// canvas can be any size without reallocating the grid.

// Byte offsets are load-bearing: uploadView() in lenia.js writes this layout by
// hand. vec4 aligns to 16, so `bg` lands at 32, not 20.
struct View {
    grid      : vec2<u32>,  //  0
    cell      : f32,        //  8   device pixels per cell
    intensity : f32,        // 12   strength of the effect over the background
    alpha     : f32,        // 16   how far between prev and curr this frame sits
    bg        : vec4<f32>,  // 32
    accent    : vec4<f32>,  // 48   the fading trail
    mid       : vec4<f32>,  // 64   the creature's body
    ink       : vec4<f32>,  // 80   its densest core
};                          // 96

@group(0) @binding(0) var<uniform>       view : View;
// The two ping-pong buffers: the step just finished, and the one before it.
// Blending between them decouples the display rate from the simulation rate.
@group(0) @binding(1) var<storage, read> prev : array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> curr : array<vec2<f32>>;

struct VSOut {
    @builtin(position) pos : vec4<f32>,
};

@vertex
fn vs(@builtin(vertex_index) i : u32) -> VSOut {
    // Single oversized triangle covering clip space; no vertex buffer needed.
    var tri = array<vec2<f32>, 3>(
        vec2<f32>(-1.0, -3.0),
        vec2<f32>(-1.0,  1.0),
        vec2<f32>( 3.0,  1.0),
    );
    var out : VSOut;
    out.pos = vec4<f32>(tri[i], 0.0, 1.0);
    return out;
}

fn tap(ix : i32, iy : i32) -> vec2<f32> {
    let w = i32(view.grid.x);
    let h = i32(view.grid.y);
    let x = ((ix % w) + w) % w;
    let y = ((iy % h) + h) % h;
    let i = u32(y * w + x);
    // Temporal interpolation: at 30 steps/s this renders continuous motion at
    // whatever rate the display runs, instead of visibly stepping 30 times.
    return mix(prev[i], curr[i], view.alpha);
}

@fragment
fn fs(@builtin(position) frag : vec4<f32>) -> @location(0) vec4<f32> {
    let g = frag.xy / view.cell;
    let c = floor(g);

    // Bilinear taps with a smoothstep weight, so upscaling a 512-cell grid to a
    // full viewport stays soft instead of showing cell edges.
    var f = g - c;
    f = f * f * (3.0 - 2.0 * f);

    let x0 = i32(c.x);
    let y0 = i32(c.y);
    let top = mix(tap(x0, y0),     tap(x0 + 1, y0),     f.x);
    let bot = mix(tap(x0, y0 + 1), tap(x0 + 1, y0 + 1), f.x);
    let v   = mix(top, bot, f.y);

    let density = clamp(v.x, 0.0, 1.0);
    let trail   = clamp(v.y, 0.0, 1.0);
    let k = view.intensity;

    // Trail first, so a live cell always paints over its own wake. The density
    // then ramps through two stops, which reads as a coloured body with a
    // darker core rather than one flat tint scaled by opacity.
    var col = view.bg.rgb;
    col = mix(col, view.accent.rgb, trail * 0.55 * k);
    col = mix(col, view.mid.rgb, smoothstep(0.02, 0.50, density) * k);
    col = mix(col, view.ink.rgb, smoothstep(0.45, 0.95, density) * k);
    return vec4<f32>(col, 1.0);
}
