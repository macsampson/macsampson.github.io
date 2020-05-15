import React from "react";
import Technology from "./Technology";
import Experience from "./Experience";
import Education from "./Education";

function Resume() {
  return (
    <section id="resume">
      <Education />
      <Experience />
      <Technology />
    </section>
  );
}

export default Resume;
