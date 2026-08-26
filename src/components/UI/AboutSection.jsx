import { profile, education, skills } from "../../content";

const AboutSection = () => (
    <>
        <section className="mb-[42px]">
            <h2 className="kicker">About</h2>
            {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base text-body mb-5 last:mb-0">
                    {paragraph}
                </p>
            ))}
        </section>

        <section className="mb-[42px]">
            <h2 className="kicker">Education</h2>
            <ul className="grid gap-[14px]">
                {education.map(({ school, degree }) => (
                    <li key={school} className="flex items-baseline justify-between gap-3">
                        <p className="text-base font-semibold tracking-[0.01em]">{school}</p>
                        <span className="text-small text-secondary shrink-0 text-right">{degree}</span>
                    </li>
                ))}
            </ul>
        </section>

        <section className="mb-[42px]">
            <h2 className="kicker">Skills</h2>
            <dl className="grid gap-1.5">
                {skills.map(({ title, items }) => (
                    <div key={title} className="sm:flex sm:gap-4">
                        <dt className="text-small font-semibold sm:w-[5.5rem] sm:shrink-0">{title}</dt>
                        <dd className="text-small text-secondary">{items}</dd>
                    </div>
                ))}
            </dl>
        </section>
    </>
);

export default AboutSection;
