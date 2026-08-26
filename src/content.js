// Single source of truth for site content.
// Kept in sync with swe/pdf/mackenzie_sampson_resume.pdf in the private resumes repo.
// Step 3 of the redesign adds an auto-generated repo list alongside `projects`;
// everything here stays hand-written on purpose.

export const profile = {
    name: "Mackenzie Sampson",
    title: "Software Engineer",
    // focus: "Full-stack & systems",
    // status: "Open to software engineering roles in the US",
    // authorization: "Canadian citizen, TN eligible",
    location: "Vancouver, BC",
    email: "hello@macsampson.com",
    resume: "/assets/resume.pdf",
    // One sentence each, following the reference: interests, currently, previously.
    intro: [
        "I'm a software engineer in Vancouver, interested in systems programming, performance, and what happens close to the metal.",
        "Currently I'm open-sourcing the ecommerce platform I built while running PocketCaps.",
        "Previously I built pipeline tooling at Electronic Arts, and interned at SAP and MDA.",
    ],
};

// `icon` keys map to the icon table in components/UI/LinksSection.jsx.
export const links = [
    { label: "GitHub", href: "https://github.com/macsampson", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/macsampson", icon: "linkedin" },
    { label: "ArtStation", href: "https://macsampson.artstation.com/", icon: "artstation" },
];

export const education = [
    {
        school: "University of British Columbia",
        degree: "Bachelor of Computer Science",
    },
];

export const skills = [
    {
        title: "Languages",
        items: "C++, Python, Go, SQL, C#, TypeScript",
    },
    {
        title: "Databases",
        items: "PostgreSQL, Prisma, DynamoDB",
    },
    {
        title: "Cloud",
        items: "AWS (Lambda, API Gateway, CDK, DynamoDB, SQS, EventBridge), Docker, Linux",
    },
];

export const projects = [
    // {
    //     title: "Inventory Reservation Service",
    //     year: "2026",
    //     summary: "Holds an item the moment it lands in a cart, so two people can never buy the last one.",
    //     tech: ["Go", "PostgreSQL"],
    //     githubUrl: "https://github.com/macsampson/reservation-service",
    // },
    {
        title: "Stockroom",
        year: "2026",
        summary: "A storefront and admin dashboard any small shop can run itself, generalized from PocketCaps.",
        tech: ["TypeScript", "Next.js", "PostgreSQL"],
        githubUrl: "https://github.com/macsampson/stockroom",
    },
    {
        title: "Ghosted",
        year: "2026",
        summary: "Tracks job applicaion status and which ones have gone quiet by reading the replies in your inbox.",
        tech: ["TypeScript", "React", "AWS CDK", "Lambda", "DynamoDB"],
        githubUrl: "https://github.com/macsampson/ghosted",
    },
    {
        title: "Monte Carlo Path Tracer",
        year: "2026",
        summary: "Renders photorealistic images by simulating how light bounces; optimized so a full frame render went from 3m28s to 7.6s.",
        tech: ["C++", "Intel TBB", "Callgrind"],
        githubUrl: "https://github.com/macsampson/pathtracer",
    },
    {
        title: "Software 3D Renderer",
        year: "2026",
        summary: "Renders 3D scenes on the CPU.",
        tech: ["C", "SDL2", "Linear algebra"],
        githubUrl: "https://github.com/macsampson/3d-renderer",
    },
    {
        title: "Mega Man Legends Maya Tools",
        year: "2025",
        summary: "Decompiles legacy 3D models + animations and imports them into Maya for use in modern pipelines.",
        tech: ["Python", "Binary parsing", "OpenMaya", "Qt"],
        githubUrl: "https://github.com/macsampson/mml-maya-tool",
    },
    // {
    //     title: "Impossible Digimon Card",
    //     year: "2025",
    //     summary: "An interactive trading card that shifts and catches the light as you move it.",
    //     tech: ["GLSL", "WebGL", "TypeScript"],
    //     githubUrl: "https://github.com/macsampson/r3f-card",
    //     demoUrl: "https://r3f-card01.vercel.app/",
    // },
];

export const experience = [
    {
        role: "Software Engineer",
        company: "PocketCaps",
        url: "https://pocketcaps.com",
        period: "2021 – 2025",
        summary: "Founded and ran an ecommerce platform that processed multiple six figures across 5,000+ customers, since open-sourced.",
    },
    {
        role: "Technical Artist, Tools & Pipeline (Contract)",
        company: "Electronic Arts",
        period: "2019 – 2020",
        summary: "Owned the Ignite pipeline downstreaming FIFA 21 HD to Nintendo Switch.",
    },
    {
        role: "Software Compliance Intern",
        company: "SAP",
        period: "2017",
        summary: "Automated data entry of backlogged open-source license compliance information, cutting entry time and errors ~85%.",
    },
    {
        role: "Software Engineer Intern",
        company: "MDA",
        period: "2016",
        summary: "Redeveloped and migrated MDA's corporate website to a new content management system.",
    },
];
