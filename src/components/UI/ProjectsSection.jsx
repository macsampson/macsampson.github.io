import { projects } from "../../content";
import { GithubIcon, ArrowIcon } from "./Icons";

const ProjectItem = ({ title, year, summary, tech, githubUrl, demoUrl }) => (
    <li>
        <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold tracking-[0.01em]">
                {githubUrl ? (
                    <a className="link" href={githubUrl} target="_blank" rel="noreferrer">
                        {title}
                        <GithubIcon width="14" height="14" className="inline-block ml-[0.35rem] align-[-0.12em]" />
                    </a>
                ) : (
                    title
                )}
            </h3>
            <span className="text-small text-secondary shrink-0 text-right">{year}</span>
        </div>

        <p className="mt-[3px] text-small text-secondary">{summary}</p>

        <p className="mt-[3px] text-small text-secondary">
            {tech.join(" · ")}
            {demoUrl && (
                <>
                    {" · "}
                    <a className="link text-primary" href={demoUrl} target="_blank" rel="noreferrer">
                        Demo
                        <ArrowIcon className="inline-block ml-[0.2rem] align-[-0.08em]" />
                    </a>
                </>
            )}
        </p>
    </li>
);

const ProjectsSection = () => (
    <section className="mb-[42px]">
        <h2 className="kicker">Selected work</h2>
        <ul className="grid gap-[14px]">
            {projects.map((project) => (
                <ProjectItem key={project.title} {...project} />
            ))}
        </ul>
    </section>
);

export default ProjectsSection;
