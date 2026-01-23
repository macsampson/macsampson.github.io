import React from 'react';
import { motion } from 'framer-motion';

const SocialLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-full transition-all border border-secondary hover:shadow-sm text-primary"
    >
        {children}
    </a>
);

const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
        >
            <header className="border-b border-secondary/50 pb-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-secondary rounded-full blur-md opacity-50"></div>
                        <img
                            src="/assets/images/profiles/pfp.jpg"
                            alt="Mackenzie Sampson"
                            className="relative z-10 w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white/50"
                        />
                    </motion.div>

                    <div className="text-center sm:text-left">
                        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl font-merriweather mb-3 text-primary">
                            mackenzie sampson
                        </h1>
                        <p className="text-xl opacity-80 font-spectral italic">Technical Artist</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm font-medium mb-8">
                    <SocialLink href="https://github.com/macsampson">GitHub</SocialLink>
                    <SocialLink href="https://macsampson.artstation.com/">ArtStation</SocialLink>
                    <SocialLink href="https://x.com/macxsampson">X</SocialLink>
                    <SocialLink href="https://linkedin.com/in/macsampson">LinkedIn</SocialLink>
                    <SocialLink href="https://medium.com/@mackenzie.sampson">Medium</SocialLink>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6 sm:p-8 rounded-2xl"
                >
                    <h2 className="font-bold text-xl sm:text-2xl mb-4 font-merriweather text-primary">
                        Pipeline Tools, Procedural Systems & Real-Time Rendering
                    </h2>
                    <p className="text-lg leading-relaxed opacity-90">
                        Technical Artist with professional AAA experience (FIFA 21, FIFA Online 4) specializing in pipeline
                        automation,
                        procedural asset generation, and shader development. I bridge the gap between art and engineering—building
                        Python/C# tools
                        for DCC applications, developing procedural workflows in Houdini and Blender, and writing real-time shaders
                        (HLSL/GLSL).
                        Strong CS foundation from UBC with expertise across the entire technical art pipeline.
                    </p>
                </motion.div>
            </header>
        </motion.section>
    );
};

export default HeroSection;
