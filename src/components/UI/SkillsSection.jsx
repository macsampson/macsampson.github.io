import React from 'react';
import { motion } from 'framer-motion';

const SkillGroup = ({ title, skills }) => (
    <div className="mb-4">
        <strong className="block mb-2 font-merriweather text-primary">{title}</strong>
        <div className="flex flex-wrap gap-2">
            {skills.split(', ').map((skill, index) => (
                <span
                    key={index}
                    className="px-3 py-1 bg-white/40 border border-secondary/50 rounded-md text-sm"
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const SkillsSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <h2 className="font-bold text-2xl sm:text-3xl mb-8 font-merriweather text-primary border-b border-secondary/30 pb-4 inline-block">
                Skills
            </h2>

            <div className="glass-panel p-6 sm:p-8 rounded-2xl">
                <SkillGroup
                    title="Technical"
                    skills="Houdini, Unreal Engine, Maya, Unity, Blender, Photoshop"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="Scripting"
                    skills="Python (PyMEL/Blender API), VEX, HLSL/GLSL, C#, MEL, C++"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="Shaders & Rendering"
                    skills="Custom shader development, PBR material authoring, Real-time rendering, Unreal Material Editor"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="Pipeline"
                    skills="Git, Perforce, FBX workflows, Maya/Blender Python APIs, Batch automation"
                />
            </div>
        </motion.section>
    );
};

export default SkillsSection;
