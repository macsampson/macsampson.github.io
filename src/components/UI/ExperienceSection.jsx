import { experience } from "../../content";
import { ArrowIcon } from "./Icons";

const ExperienceSection = () => (
    <section className="mb-[42px]">
        <h2 className="kicker">Experience</h2>
        <ul className="grid gap-4">
            {experience.map(({ role, company, url, period, summary }) => (
                <li key={company}>
                    <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-base font-semibold tracking-[0.01em]">
                            {url ? (
                                <a className="link" href={url} target="_blank" rel="noreferrer">
                                    {company}
                                    <ArrowIcon className="inline-block ml-[0.2rem] align-[-0.08em]" />
                                </a>
                            ) : (
                                company
                            )}
                        </h3>
                        <span className="text-small text-secondary shrink-0 text-right">{period}</span>
                    </div>
                    <p className="mt-[3px] text-small text-secondary">{role}</p>
                    <p className="mt-[3px] text-small text-secondary">{summary}</p>
                </li>
            ))}
        </ul>
    </section>
);

export default ExperienceSection;
