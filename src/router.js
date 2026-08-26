import { useEffect, useState } from "react";

/**
 * Tab state, mirrored into the URL hash.
 *
 * This is deliberately not a router: there are no real paths, so GitHub Pages
 * needs no rewrite rules and every URL still returns a 200. The hash only exists
 * so tabs are linkable and the browser back button steps between them instead of
 * leaving the site.
 */

export const TABS = [
    { label: "Home", id: "" },
    { label: "Projects", id: "projects" },
    { label: "Work", id: "work" },
];

export const hrefFor = (id) => (id ? `#${id}` : "#");

const readTab = () => {
    const id = window.location.hash.replace(/^#\/?/, "");
    return TABS.some((tab) => tab.id === id) ? id : "";
};

export const useTab = () => {
    const [tab, setTab] = useState(readTab);

    useEffect(() => {
        const onHashChange = () => setTab(readTab());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tab]);

    return tab;
};
