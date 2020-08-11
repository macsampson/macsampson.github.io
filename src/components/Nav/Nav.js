import React from "react";
import Socials from "../header/Socials";
import navData from "../../data/navData";
import NavSection from "./NavSection";

function Nav() {
  const navComps = navData.sections.map(section => (
    <NavSection name={section.name} href={section.href} />
  ));
  return (
    <nav id="nav-wrap" className="opaque">
      <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
        Show navigation
      </a>
      <a className="mobile-btn" href="#" title="Hide navigation">
        Hide navigation
      </a>
      <ul id="nav" className="nav flex-container">
        {navComps}
        <Socials />
      </ul>
    </nav>
  );
}

export default Nav;
