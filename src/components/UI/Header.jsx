import { profile } from "../../content";
import { TABS, hrefFor } from "../../router";

const Header = ({ tab }) => (
    <header className="mb-[42px]">
        <img
            src="/assets/images/profiles/pfp.webp"
            alt=""
            width="104"
            height="104"
            loading="eager"
            decoding="async"
            className="w-[104px] h-[104px] rounded-[22px] object-cover border border-rule block mb-[18px]"
        />

        <h1 className="font-display text-[1.55rem] font-bold tracking-[-0.02em] leading-[1.3] mb-1">
            <a href="#" className="no-underline border-0 hover:opacity-[0.85] transition-opacity">
                {profile.name}
            </a>
        </h1>
        <p className="text-[0.9rem] text-secondary mb-1">
            {profile.title} · {profile.focus}
        </p>
        <p className="text-[0.9rem]">{profile.location}</p>
        <p className="text-[0.9rem] font-medium mt-1">{profile.status}</p>
        <p className="text-small text-secondary">{profile.authorization}</p>

        <nav className="flex gap-5 mt-4" aria-label="Main navigation">
            {TABS.map(({ label, id }) => (
                <a
                    key={label}
                    href={hrefFor(id)}
                    data-text={label}
                    className="nav-link"
                    aria-current={id === tab ? "page" : undefined}
                >
                    {label}
                </a>
            ))}
        </nav>
    </header>
);

export default Header;
