import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={onClose}
        >
            <motion.div
                key="modal-content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.15 }}
                className="bg-white border border-secondary/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-secondary/10 rounded-full transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold font-merriweather text-primary mb-1">{project.title}</h2>
                    {project.date && (
                        <p className="text-sm text-secondary mb-6">{project.date}</p>
                    )}
                    {!project.date && <div className="mb-6" />}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            {project.image && (
                                <div className="rounded-lg overflow-hidden border border-secondary/20 mb-6">
                                    <img src={project.image} alt={project.title} className="w-full object-cover" />
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-secondary/10 text-xs rounded text-primary/80 border border-secondary/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-black text-white hover:bg-neutral-800 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        GitHub <ExternalLink size={13} />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-700 text-green-50 hover:bg-green-800 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Demo <ExternalLink size={13} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <ul className="space-y-3 text-sm leading-relaxed text-primary/80">
                                {project.description.map((point, index) => (
                                    <li key={index} className="flex gap-3">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectCard = ({ project, onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const imageSrc = project.thumbnail && !isHovered ? project.thumbnail : project.image;

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-white border border-secondary/20 hover:border-secondary/50 rounded-lg overflow-hidden cursor-pointer transition-colors group"
        >
            {project.image && (
                <div className="aspect-video overflow-hidden bg-secondary/5">
                    <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {!project.image && project.videoId && (
                <div className="aspect-video bg-secondary/10 flex items-center justify-center">
                    <span className="text-secondary text-sm">Video Project</span>
                </div>
            )}

            <div className="p-4">
                <h4 className="font-semibold text-sm font-merriweather text-primary line-clamp-2">{project.title}</h4>
                {project.date && (
                    <p className="text-xs text-secondary mb-2">{project.date}</p>
                )}
                {!project.date && <div className="mb-2" />}
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-secondary/10 text-xs rounded text-secondary">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);

    const projects = [
        {
            title: "Monte Carlo Path Tracer",
            date: "2026",
            image: "/assets/images/projects/images/pathtracer.png",
            thumbnail: "/assets/images/projects/images/pathtracer.png",
            githubUrl: "https://github.com/macsampson/pathtracer",
            description: [
                "Physically-based path tracer built from scratch in modern C++ following the Ray Tracing in One Weekend series, extended with production-oriented optimizations.",
                "Implemented BVH acceleration with TBB-based parallelism, achieving ~27× speedup over the single-threaded baseline.",
                "Added Next Event Estimation (NEE) for direct light sampling on both diffuse and volumetric surfaces, with importance sampling and firefly clamping for variance reduction.",
                "Profiled and optimized hot paths using Callgrind and KCachegrind, fixing BVH integration bugs and degenerate AABB cases along the way."
            ],
            tags: ["C++", "Ray Tracing", "BVH", "TBB", "Importance Sampling"]
        },
        {
            title: "Software 3D Renderer",
            date: "2026",
            image: "/assets/images/projects/gifs/link.webp",
            thumbnail: "/assets/images/projects/images/link_frame1.png",
            githubUrl: "https://github.com/macsampson/3d-renderer",
            description: [
                "CPU-only software rasterizer in C where all vertex transformation, clipping, rasterization, and texturing run on the CPU with SDL2 used only for window management and pixel presentation.",
                "Perspective-correct texture mapping, Sutherland-Hodgman view-frustum clipping, backface culling, and a 1/w z-buffer for correct occlusion on complex geometry.",
                "Cubemap skybox, OBJ/MTL multi-material loading, FPS camera with mouse look, and a 6-mode render toggle (wireframe through textured)."
            ],
            tags: ["C", "SDL2", "Rasterization", "Linear Algebra", "3D Graphics"]
        },
        {
            title: "Mega Man Legends (PS1) Maya Pipeline Tools",
            date: "2025",
            image: "/assets/images/projects/gifs/megaman.webp",
            thumbnail: "/assets/images/projects/images/megaman_frame1.webp",
            githubUrl: "https://github.com/macsampson/mml-maya-tool",
            description: [
                "Reverse-engineered the PS1 asset format for Mega Man Legends to extract legacy character data, building on community decompilation work.",
                "Built a native importer with a PySide2 Qt UI and real-time 3D preview on top of the OpenMaya API.",
                "Re-implemented coordinate-space transformations to translate PS1 hardware-specific vertex data into modern engine space.",
                "Automated the skinning process while preserving the original \"action figure\" deformation style."
            ],
            tags: ["Python", "Reverse Engineering", "Binary Parsing", "Qt (PySide2)", "OpenMaya API"]
        },
        {
            title: "Impossible Digimon Card",
            date: "2025",
            demoUrl: "https://r3f-card01.vercel.app/",
            githubUrl: "https://github.com/macsampson/r3f-card",
            image: "/assets/images/projects/gifs/cherubimon.webp",
            thumbnail: "/assets/images/projects/images/cherubimon_frame1.webp",
            description: [
                "Interactive holographic trading card with custom GLSL shaders.",
                "Features multi-layer parallax, stencil buffer masking, and view-dependent rendering.",
                "Built using React Three Fiber and TypeScript."
            ],
            tags: ["GLSL", "React Three Fiber", "TypeScript", "WebGL"]
        },
        {
            title: "Procedural Keycap Tool",
            date: "2021",
            githubUrl: "https://github.com/macsampson/blender_keycap_generator",
            image: "/assets/images/projects/gifs/keycap.webp",
            thumbnail: "/assets/images/projects/images/keycap_frame1.png",
            description: [
                "Production-ready Blender add-on for procedural keycap generation with real-time topology updates via modifier stacks.",
                "Implemented parametric controls for keycap profiles (Cherry, OEM, SA, DSA) using the Python API and bmesh.",
                "Built an automated export pipeline with one-click STL generation and Lychee Slicer integration for print optimization."
            ],
            tags: ["Python", "Blender API", "bmesh", "Automation"]
        },
    ];

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-20"
            >
                <h2 className="font-bold text-xl font-merriweather text-primary mb-8 pb-3 border-b border-secondary/20">
                    Projects
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </motion.section>

            <AnimatePresence mode="wait">
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectsSection;
