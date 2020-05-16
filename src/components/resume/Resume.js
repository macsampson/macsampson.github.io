import React from "react";
import Technologies from "./Technologies";
import Experience from "./Experience";
import Education from "./Education";

function Resume() {
  return (
    <section id="resume">
      <Technologies />
      <Education />
      <Experience />
    </section>
  );
}

export default Resume;
