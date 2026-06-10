import { motion } from 'framer-motion';

const ExperienceCard = ({ role, company, period, url, description, tags }) => (
    <div className="pb-8 mb-8 border-b border-secondary/15 last:border-0 last:mb-0 last:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1 gap-1">
            <h4 className="font-semibold font-merriweather text-primary">{role}</h4>
            <span className="text-xs text-secondary shrink-0">{period}</span>
        </div>

        <div className="mb-3">
            {url ? (
                <a href={url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
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
            role: "Full-Stack Developer & Tooling",
            company: "PocketCaps",
            url: "https://pocketcaps.com",
            period: "March 2021 – Aug 2024",
            description: [
                "Built and shipped the entire stack solo: a customer-facing storefront and a separate admin app, both Next.js on Vercel, backed by a Supabase (Postgres) database.",
                "Developed the admin app as a custom dashboard and CMS for managing products, inventory, and orders.",
                // "Developed a procedural asset pipeline and a custom Blender add-on with real-time topology updates and automated STL export workflows.",
                // "Served 1000+ customers while managing hard manufacturing constraints (±0.1mm tolerances, material shrinkage compensation)."
            ],
            tags: ["Next.js", "Supabase", "Vercel", "Python", "Blender API"]
        },
        {
            role: "Pipeline Tools Engineer",
            company: "Electronic Arts",
            period: "Sept 2019 – Nov 2020",
            description: [
                "Owned the Ignite pipeline for FIFA 21 (Switch) and supported FIFA Online 4.",
                "Built Python tools to automate vertex-weight reintegration for hair physics across 50+ character rigs, reducing artist overhead by ~60%."
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
