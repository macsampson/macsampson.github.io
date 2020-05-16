import React from "react";
import Projects from "./Projects";
import Artwork from "./Artwork";
import artData from "../../data/artData";

function Portfolio() {
  return (
    <section id="portfolio">
      <Projects />
      {artData.artwork.display ? <Artwork /> : null}
      <br />
      <br />
    </section>
  );
}

export default Portfolio;
