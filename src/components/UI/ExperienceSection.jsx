import { motion } from 'framer-motion';

const ExperienceCard = ({ role, company, period, url, description, tags }) => (
    <div className="pb-8 mb-8 border-b border-secondary/15 last:border-0 last:mb-0 last:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1 gap-1">
            <h4 className="font-semibold font-merriweather text-primary">{role}</h4>
            <span className="text-xs text-secondary shrink-0">{period}</span>
        </div>

        <div className="mb-3">
            {url ? (
                <a href={url} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-primary underline underline-offset-2 transition-colors">
                    {company} ↗
                </a>
            ) : (
                <span className="text-sm text-secondary">{company}</span>
            )}
        </div>

        <ul className="text-sm leading-relaxed text-primary/75 space-y-1.5 mb-4 list-disc list-outside ml-4">
            {description.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-secondary/10 text-xs rounded text-secondary border border-secondary/20">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

const ExperienceSection = () => {
    const experiences = [
        {
            role: "Technical Pipeline & Tools Developer",
            company: "PocketCaps",
            url: "https://pocketcaps.com",
            period: "March 2021 – Aug 2023",
            description: [
                "Built procedural asset pipeline for parametric keycap modeling.",
                "Developed Blender add-on with custom UI for real-time topology updates and automated STL export workflows.",
                "Automated modeling-to-manufacturing pipeline with STL export and Lychee Slicer integration, reducing manual prep time by ~80%.",
                "Served 1000+ customers while managing hard manufacturing constraints (±0.1mm tolerances, material shrinkage compensation)."
            ],
            tags: ["Blender API", "Procedural Modeling", "Pipeline Automation", "Python"]
        },
        {
            role: "Technical Artist - Tools & Pipeline",
            company: "Electronic Arts",
            period: "Sept 2019 – Nov 2020",
            description: [
                "Owned Ignite pipeline for FIFA 21 (Switch) and supported FIFA Online 4.",
                "Built Python tools to automate vertex-weight reintegration for hair physics across 50+ character rigs, reducing artist overhead by ~60%.",
                "Developed C# CLI tools and Python scripts for metadata migration from Metador database.",
                "Partnered with artists, producers, and QA to maintain reliable builds under tight sports game release cadence."
            ],
            tags: ["Python", "C#", "Maya", "Perforce", "JIRA"]
        },
    ];

    return (
        <motion.section
            id="work"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
        >
            <h2 className="font-bold text-xl font-merriweather text-primary mb-8 pb-3 border-b border-secondary/20">
                Experience
            </h2>

            <div>
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
        </motion.section>
    );
};

export default ExperienceSection;
