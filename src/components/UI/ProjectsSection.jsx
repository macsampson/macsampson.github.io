import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, url, description, tags }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card p-6 rounded-xl flex flex-col h-full"
    >
        <div className="mb-3">
            {url ? (
                <a href={url} target="_blank" rel="noreferrer" className="group">
                    <h4 className="font-bold text-lg font-merriweather group-hover:underline decoration-primary decoration-2 underline-offset-4">
                        {title} ↗
                    </h4>
                </a>
            ) : (
                <h4 className="font-bold text-lg font-merriweather">{title}</h4>
            )}
        </div>

        <ul className="text-sm leading-relaxed mb-4 opacity-80 flex-grow list-disc list-outside ml-4 space-y-1">
            {description.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-secondary/20 text-xs rounded text-primary border border-secondary/20">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const ProjectsSection = () => {
    const projects = [
        {
            title: "Mega Man Legends (PS1) Maya Pipeline Tools",
            description: [
                "Developing modern asset extraction pipeline for Mega Man Legends by adapting reverse-engineering research.",
                "Built native Maya importer using PySide2 and OpenMaya API with real-time 3D preview.",
                "Re-implemented coordinate space transformations for PS1 hardware-specific vertex data.",
                "Automating skinning process while preserving original \"action figure\" deformation style for modern engines."
            ],
            tags: ["Python", "OpenMaya API", "Qt (PyQt/PySide2)", "Maya"]
        },
        {
            title: "Procedural House Generator (Houdini HDA)",
            url: "https://macsampson.artstation.com/projects/rl3BV5",
            description: [
                "Built parametric architectural generator as Houdini Digital Asset with 30+ artist-facing controls for doors, windows, columns, stairs, and materials.",
                "Implemented procedural geometry systems in VEX with attribute-driven snapping logic.",
                "Developed smart constraint systems for staircases that auto-calculate rise/run ratios and maintain building code compliance."
            ],
            tags: ["Houdini", "VEX", "Procedural Generation"]
        },
        {
            title: "Procedural Keycap Tool (Blender Add-on)",
            url: "https://github.com/macsampson/blender_keycap_generator",
            description: [
                "Production-ready Blender add-on for procedural keycap generation with real-time topology updates via modifier stacks.",
                "Implemented parametric controls for keycap profiles (Cherry, OEM, SA, DSA) using Python API and bmesh.",
                "Built automated export pipeline with one-click STL generation and Lychee Slicer integration for print optimization."
            ],
            tags: ["Python", "Blender API", "bmesh", "Procedural Modeling"]
        },
        {
            title: "Impossible Digimon Card",
            url: "https://r3f-card01.vercel.app/",
            description: [
                "Interactive holographic trading card with custom GLSL shaders.",
                "Features multi-layer parallax, stencil buffer masking, and view-dependent rendering.",
                "Built using React Three Fiber and TypeScript."
            ],
            tags: ["GLSL", "React Three Fiber", "TypeScript", "Photoshop"]
        }
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
