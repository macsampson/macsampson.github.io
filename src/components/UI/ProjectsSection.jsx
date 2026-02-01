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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
            onClick={onClose}
        >
            <motion.div
                key="modal-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.15 }}
                className="bg-[#0f172a] border border-secondary/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="p-6 md:p-8">
                    <h2 className="text-3xl font-bold font-merriweather text-primary mb-6">{project.title}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            {project.image && (
                                <div className="rounded-lg overflow-hidden border border-secondary/20 mb-6 relative">
                                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
                                    <img src={project.image} alt={project.title} className="w-full object-cover" />
                                </div>
                            )}

                            {project.videoId && (
                                <div className="aspect-video rounded-lg overflow-hidden border border-secondary/20 mb-6">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${project.videoId}`}
                                        title={project.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
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
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-black/40 hover:bg-black/20 text-primary rounded-lg border border-secondary/30 hover:border-secondary/60 transition-all duration-300 group font-medium hover:scale-105 text-sm"
                                    >
                                        View on GitHub
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary/20 hover:bg-secondary/40 text-primary rounded-lg border border-secondary/30 hover:border-secondary/60 transition-all duration-300 group font-medium hover:scale-105 text-sm"
                                    >
                                        {project.demoUrl.includes("artstation") ? "View on ArtStation" : "View Demo"}
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-primary/90 mb-4">Project Details</h3>
                            <ul className="space-y-3 opacity-90 leading-relaxed">
                                {project.description.map((point, index) => (
                                    <li key={index} className="flex gap-3">
                                        <span className="text-secondary mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
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
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="glass-card p-2 rounded-xl flex flex-col h-full group/card cursor-pointer hover:border-primary/40 transition-colors"
        >
            <div className="mb-2">
                <h4 className="font-bold text-md font-merriweather text-primary line-clamp-2 min-h-[3.5rem]">{project.title}</h4>
            </div>

            {project.image && (
                <div className="mb-4 rounded-lg overflow-hidden border border-secondary/20 relative aspect-video">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                    <img src={imageSrc} alt={project.title} className="w-full h-full object-cover" />
                </div>
            )}

            {!project.image && project.videoId && (
                <div className="mb-4 rounded-lg overflow-hidden border border-secondary/20 relative aspect-video bg-black/40 flex items-center justify-center">
                    <div className="text-primary/50 text-sm">Video Project</div>
                </div>
            )}

            <div className="mt-auto space-y-3">
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary/10 text-xs rounded text-primary/80 border border-secondary/20">
                            {tag}
                        </span>
                    ))}
                    {/* {project.tags.length > 5 && (
                        <span className="px-2 py-1 bg-secondary/5 text-xs rounded text-primary/60 border border-secondary/10">
                            +{project.tags.length - 3}
                        </span>
                    )} */}
                </div>

                <div className="pt-3 border-t border-secondary/20 flex justify-end">
                    <span className="text-xs font-medium text-secondary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Details <span className="text-lg">→</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);

    const projects = [
        {
            title: "Mega Man Legends (PS1) Maya Pipeline Tools - WIP",
            image: "/assets/images/projects/gifs/megaman.gif",
            thumbnail: "/assets/images/projects/images/megaman_frame1.gif",
            githubUrl: "https://github.com/macsampson/mml-maya-tool",
            description: [
                "Legacy systems research project developing a modern asset extraction pipeline by building on previous reverse-engineering efforts.",
                "Built native Maya importer using PySide2 and OpenMaya API with real-time 3D preview.",
                "Re-implemented coordinate space transformations for PS1 hardware-specific vertex data.",
                "Automating skinning process while preserving original \"action figure\" deformation style for modern engines."
            ],
            tags: ["Python", "OpenMaya API", "Qt (PyQt/PySide2)", "Maya"]
        },
        {
            title: "Industrial Robot Arm Rig - WIP",
            image: "/assets/images/projects/gifs/robot_arm.gif",
            thumbnail: "/assets/images/projects/images/robot_arm_frame1.gif",
            description: [
                "Implemented strict Channel Control and attribute locking to prevent mechanical breaks and speed up blocking.",
                "Utilized Local Rotation Axis (LRA) alignment, mapping complex claw motions to a unified Z-axis for symmetrical control.",
                "Ensured geometric accuracy using Projected Centering for pivots."
            ],
            tags: ["Maya", "Rigging", "Arnold", "Nuke"]
        },
        {
            title: "Procedural House Generator (Houdini HDA)",
            image: "/assets/images/projects/gifs/house.gif",
            thumbnail: "/assets/images/projects/images/house_frame1.gif",
            demoUrl: "https://macsampson.artstation.com/projects/rl3BV5",
            videoId: "m1UwbSoq5-0",
            description: [
                "Built parametric architectural generator as Houdini Digital Asset with 30+ artist-facing controls for doors, windows, columns, stairs, and materials.",
                "Implemented procedural geometry systems in VEX with attribute-driven snapping logic.",
                "Developed smart constraint systems for staircases that auto-calculate rise/run ratios and maintain building code compliance."
            ],
            tags: ["Houdini", "VEX", "Procedural Modeling"]
        },
        {
            title: "Impossible Digimon Card",
            demoUrl: "https://r3f-card01.vercel.app/",
            githubUrl: "https://github.com/macsampson/r3f-card",
            image: "/assets/images/projects/gifs/cherubimon.gif",
            thumbnail: "/assets/images/projects/images/cherubimon_frame1.gif",
            description: [
                "Interactive holographic trading card with custom GLSL shaders.",
                "Features multi-layer parallax, stencil buffer masking, and view-dependent rendering.",
                "Built using React Three Fiber and TypeScript."
            ],
            tags: ["GLSL", "React Three Fiber", "TypeScript", "Photoshop"]
        },
        {
            title: "Procedural Keycap Tool (Blender Add-on)",
            githubUrl: "https://github.com/macsampson/blender_keycap_generator",
            image: "/assets/images/projects/gifs/keycap.gif",
            thumbnail: "/assets/images/projects/images/keycap_frame1.png",
            description: [
                "Production-ready Blender add-on for procedural keycap generation with real-time topology updates via modifier stacks.",
                "Implemented parametric controls for keycap profiles (Cherry, OEM, SA, DSA) using Python API and bmesh.",
                "Built automated export pipeline with one-click STL generation and Lychee Slicer integration for print optimization."
            ],
            tags: ["Python", "Blender API", "bmesh", "Procedural Modeling"]
        },
    ];

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="font-bold text-2xl sm:text-3xl mb-8 font-merriweather text-primary border-b border-secondary/30 pb-4 inline-block">
                    Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
