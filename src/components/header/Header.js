import React from "react";
import Socials from "./Socials";
import Nav from "../Nav";
import Intro from "./Intro";

function Header() {
  return (
    <header id="home">
      <Nav />
      <div className="row banner">
        <div className="banner-text">
          <Intro />
          <hr />
          <Socials />
        </div>
      </div>
      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-open" />
        </a>
      </p>
    </header>
  );
}

export default Header;
