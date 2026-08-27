import { profile } from "../../content";
import { MailIcon } from "./Icons";

const Footer = () => (
    <footer className="mt-[30px] pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-secondary">
            &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <a
            className="icon-link tap-target text-small text-secondary"
            href={`mailto:${profile.email}`}
        >
            <MailIcon width="14" height="14" />
            {profile.email}
        </a>
    </footer>
);

export default Footer;
