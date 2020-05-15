import React from "react";
import Projects from "./Projects";
import Artwork from "./Artwork";
import resumeData from "../../resumeData";

function Portfolio() {
  return (
    <section id="portfolio">
      <Projects />
      {resumeData.artwork.display ? <Artwork /> : null}
      <br />
      <br />
    </section>
  );
}

export default Portfolio;
