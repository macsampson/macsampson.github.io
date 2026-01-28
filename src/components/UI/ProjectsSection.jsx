import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, githubUrl, demoUrl, description, tags, videoId, image }) => (
    <motion.div
        // whileHover={{ scale: 1.02 }}
        className="glass-card p-6 rounded-xl flex flex-col h-full group/card"
    >
        <div className="mb-3">
            <h4 className="font-bold text-lg font-merriweather text-primary">{title}</h4>
        </div>

        {image && (
            <div className="mb-4 rounded-lg overflow-hidden border border-secondary/20 relative">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                <img src={image} alt={title} className="w-full max-h-72 object-cover" />
            </div>
        )}

        {videoId && (
            <div className="mb-4 aspect-video rounded-lg overflow-hidden border border-secondary/20">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        )}

        <ul className="text-sm leading-relaxed mb-6 opacity-80 flex-grow list-disc list-outside ml-4 space-y-1">
            {description.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>

        <div className="mt-auto space-y-4 pt-4 border-t border-secondary/20">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary/10 text-xs rounded text-primary/80 border border-secondary/20">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-3">
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary/70 hover:bg-primary/90 text-primary rounded-lg border border-primary/30 hover:border-primary/60 transition-all duration-300 group font-medium hover:scale-105 text-sm"
                    >
                        View on GitHub
                        <ExternalLink size={14} />
                    </a>
                )}
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary/70 hover:bg-secondary/90 text-primary rounded-lg border border-primary/30 hover:border-primary/60 transition-all duration-300 group font-medium hover:scale-105 text-sm"
                    >
                        {demoUrl.includes("artstation") ? "View on ArtStation" : "View Demo"}
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

const ProjectsSection = () => {
    const projects = [
        {
            title: "Mega Man Legends (PS1) Maya Pipeline Tools - WIP",
            image: "/assets/images/projects/megaman1.gif",
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
            title: "Procedural House Generator (Houdini HDA)",
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
            image: "/assets/images/projects/cherubimon.gif",
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
            image: "/assets/images/projects/keycap.gif",
            description: [
                "Production-ready Blender add-on for procedural keycap generation with real-time topology updates via modifier stacks.",
                "Implemented parametric controls for keycap profiles (Cherry, OEM, SA, DSA) using Python API and bmesh.",
                "Built automated export pipeline with one-click STL generation and Lychee Slicer integration for print optimization."
            ],
            tags: ["Python", "Blender API", "bmesh", "Procedural Modeling"]
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <h2 className="font-bold text-2xl sm:text-3xl mb-8 font-merriweather text-primary border-b border-secondary/30 pb-4 inline-block">
                Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </motion.section>
    );
};

export default ProjectsSection;
