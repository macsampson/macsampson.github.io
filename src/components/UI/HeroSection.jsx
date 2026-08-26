import { profile, education, skills } from "../../content";

const Row = ({ label, children }) => (
    <div className="flex items-baseline justify-between gap-3 sm:gap-6">
        <p className="text-small text-secondary">{children}</p>
        <span className="text-small text-secondary shrink-0 text-right">{label}</span>
    </div>
);

const HeroSection = () => (
    <header className="mb-[42px]">
        <img
            src="/assets/images/profiles/pfp.webp"
            alt=""
            width="104"
            height="104"
            className="w-[104px] h-[104px] rounded-[22px] object-cover border border-rule block mb-[18px]"
        />

        <h1 className="font-display text-[1.55rem] font-bold tracking-[-0.02em] leading-[1.3] mb-1">
            {profile.name}
        </h1>
        <p className="text-[0.9rem] text-secondary mb-1">
            {profile.title} · {profile.focus}
        </p>
        <p className="text-[0.9rem]">{profile.location}</p>

        <div className="mt-[42px]">
            {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base text-body mb-5 last:mb-0">
                    {paragraph}
                </p>
            ))}
        </div>

        <div className="mt-[42px]">
            <h2 className="kicker">Education</h2>
            <Row label={education.degree}>{education.school}</Row>
        </div>

        <div className="mt-[42px]">
            <h2 className="kicker">Skills</h2>
            <dl className="grid gap-1.5">
                {skills.map(({ title, items }) => (
                    <div key={title} className="sm:flex sm:gap-4">
                        <dt className="text-small font-semibold sm:w-[5.5rem] sm:shrink-0">{title}</dt>
                        <dd className="text-small text-secondary">{items}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </header>
);

export default HeroSection;
