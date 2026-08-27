import { profile } from "../../content";
import { TABS, hrefFor } from "../../router";

// Optional fields (focus, status, authorization) are commented out in
// content.js from time to time, so join what exists rather than rendering a
// dangling separator or an empty paragraph.
const byline = [profile.title, profile.focus].filter(Boolean).join(" · ");

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
        {byline && <p className="text-meta text-secondary mb-1">{byline}</p>}
        <p className="text-meta">{profile.location}</p>
        {profile.status && <p className="text-meta font-medium mt-1">{profile.status}</p>}
        {profile.authorization && (
            <p className="text-small text-secondary">{profile.authorization}</p>
        )}

        {/* gap-y leaves room for the tab hit areas, which overhang the row. */}
        <nav className="flex flex-wrap gap-x-6 gap-y-5 mt-5" aria-label="Main navigation">
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
