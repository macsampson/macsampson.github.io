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
                    <SocialLink href="https://linkedin.com/in/macsampson">LinkedIn</SocialLink>
                    <SocialLink href="https://medium.com/@mackenzie.sampson">Medium</SocialLink>
                    {/* <SocialLink href="https://x.com/macxsampson">X</SocialLink> */}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6 sm:p-8 rounded-2xl max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* About Me Column */}
                    <div>
                        <h2 className="font-bold text-xl sm:text-2xl mb-4 font-merriweather text-primary">
                            About Me
                        </h2>
                        <p className="text-lg sm:text-l leading-relaxed opacity-90 mb-6">
                            I’m a Technical Artist focused on building procedural tools, shaders, and pipelines that scale in real production. With a Computer Science degree from UBC, and a background in business, I view pipelines not just as code, but as the infrastructure for a scalable creative business. <br /><br /> I build Python tooling for Maya and Blender, write shaders in HLSL/GLSL, and create artist-facing digital assets in Houdini. Previously at EA, I helped automate asset pipelines for FIFA titles (FIFA 21 & FIFA Online 4) and supported artists across teams and platforms. That experience taught me that the best tools aren’t flashy, they’re reliable.
                        </p>
                    </div>



                    {/* Divider (Hidden on mobile, block on desktop) */}
                    <div className="hidden md:block w-px bg-secondary/30 absolute left-1/2 top-8 bottom-8"></div>

                    {/* Mobile Divider (Block on mobile, hidden on desktop) */}
                    <div className="block md:hidden h-px w-full bg-secondary/30 my-4"></div>

                    {/* Skills & Education Column */}
                    <div>
                        <div className="mb-4">
                            <strong className="block mb-2 font-merriweather text-primary">Education</strong>
                            <div className="flex flex-row gap-11">
                                <div>
                                    <div className="text-sm font-bold opacity-90">University of British Columbia</div>
                                    <div className="text-sm opacity-80">B.Sc. Computer Science</div>
                                </div>


                            </div>
                        </div>
                        <div className="h-px bg-secondary/30 my-4" />
                        <SkillGroup
                            title="Technical"
                            skills="Houdini, Unreal Engine, Maya, Unity, Blender, Photoshop"
                        />
                        <div className="h-px bg-secondary/30 my-4" />
                        <SkillGroup
                            title="Scripting"
                            skills="Python, VEX, HLSL/GLSL, C#, C++"
                        />
                        <div className="h-px bg-secondary/30 my-4" />
                        <SkillGroup
                            title="Shaders & Rendering"
                            skills="Custom shader development, PBR material authoring, Real-time rendering, Unreal Material Editor"
                        />


                    </div>
                </motion.div>
            </header>
        </motion.section >
    );
};

export default HeroSection;
