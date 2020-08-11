import React from "react";
import Technologies from "./Technologies";
import Experience from "./Experience";
import Education from "./Education";

function Resume() {
  return (
    <section id="resume">
      <Experience />
      <Education />
      <Technologies />
    </section>
  );
}

export default Resume;
