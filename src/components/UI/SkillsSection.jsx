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
                    title="Languages"
                    skills="Python, C++, C#, VEX, HLSL/GLSL, MEL, SQL"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="DCC Tools"
                    skills="Houdini, Unreal Engine (Materials/PCG/Blueprints), Maya, Blender, Photoshop"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="Graphics/Shaders"
                    skills="Real-time shader development, PBR workflows, Rendering optimization, Lighting systems"
                />
                <div className="h-px bg-secondary/30 my-4" />
                <SkillGroup
                    title="Pipeline/DevOps"
                    skills="Perforce, Git, Python APIs (Maya/Blender), Docker, Jenkins, AWS (EC2 + S3), GitHub Actions"
                />
            </div>
        </motion.section>
    );
};

export default SkillsSection;
