import { profile, links } from "../../content";
import { GithubIcon, LinkedinIcon, ArtstationIcon, MailIcon, FileIcon } from "./Icons";

// `icon` keys used in content.js map to these components.
const icons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    artstation: ArtstationIcon,
    mail: MailIcon,
    file: FileIcon,
};

const entries = [
    { label: profile.email, href: `mailto:${profile.email}`, icon: "mail", external: false },
    { label: "Résumé", href: profile.resume, icon: "file", external: false },
    ...links,
];

const LinksSection = () => (
    <section className="mb-[42px]">
        <h2 className="kicker">Links</h2>
        <ul className="flex flex-col items-start gap-1.5">
            {entries.map(({ label, href, icon, external = true }) => {
                const Icon = icons[icon];
                return (
                    <li key={label} className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="text-secondary text-[1.1rem] leading-none">
                            ·
                        </span>
                        <a
                            className="icon-link text-[0.92rem] py-1"
                            href={href}
                            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                            <Icon />
                            {label}
                        </a>
                    </li>
                );
            })}
        </ul>
    </section>
);

export default LinksSection;
