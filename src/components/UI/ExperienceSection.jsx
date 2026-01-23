import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ role, company, period, type, url, description, tags }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card p-6 rounded-xl mb-6 last:mb-0"
    >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h4 className="font-bold text-lg font-merriweather">{role}</h4>
            <span className="text-sm opacity-70 bg-secondary/30 px-2 py-0.5 rounded">{period}</span>
        </div>

        <div className="mb-3 flex items-center justify-between">
            {url ? (
                <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:text-primaryHover font-medium underline">
                    {company} ↗
                </a>
            ) : (
                <span className="text-primary font-medium">{company}</span>
            )}
        </div>

        <p className="text-sm leading-relaxed mb-4 opacity-80">
            {description}
        </p>

        <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-secondary/20 text-xs rounded text-primary border border-secondary/20">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const ExperienceSection = () => {
    const experiences = [
        {
            role: "Founder | Technical Pipeline & Tools Developer",
            company: "PocketCaps",
            url: "https://pocketcaps.com",
            period: "March 2021 – Aug 2024",
            description: "Built complete procedural asset generation pipeline for parametric keycap modeling. Developed Blender add-on with custom UI for real-time topology updates and non-destructive workflows. Automated modeling-to-manufacturing pipeline with STL export and Lychee Slicer integration, reducing manual prep time by ~80%. Served 1000+ customers while managing hard manufacturing constraints (±0.1mm tolerances, material shrinkage compensation).",
            tags: ["Blender Python API", "Procedural Modeling", "Pipeline Automation", "TypeScript", "React"]
        },
        {
            role: "Technical Artist",
            company: "Electronic Arts",
            period: "Sept 2019 – Nov 2020",
            description: "Owned Ignite pipeline for FIFA 21 (Switch) and supported FIFA Online 4. Built Python tools (PyMEL) to automate vertex-weight reintegration for hair physics across 50+ character rigs, reducing artist overhead by ~60%. Developed C# CLI tools and Python scripts for metadata migration from Metador database. Partnered with artists, producers, and QA to maintain reliable builds under tight sports game release cadence.",
            tags: ["Python/PyMEL", "C#", "Maya", "Perforce", "JIRA"]
        },
        {
            role: "Compliance Tools Intern",
            company: "SAP",
            period: "May – Dec 2017",
            description: "Identified inefficiencies in manual compliance workflows and developed automated tool for FOSS library integration management. Reduced data entry time by ~80% and errors by ~95% through web scraping and database integration. Acted as liaison between legal and engineering teams for requirements gathering and tool iteration.",
            tags: ["Python", "Selenium", "SQL"]
        }
    ];

    return (
        <motion.section
            id="work"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <h2 className="font-bold text-2xl sm:text-3xl mb-8 font-merriweather text-primary border-b border-secondary/30 pb-4 inline-block">
                Experience
            </h2>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
        </motion.section>
    );
};

export default ExperienceSection;
