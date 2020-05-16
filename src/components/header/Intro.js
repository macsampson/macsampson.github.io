import React from "react";
import aboutData from "../../data/aboutData";

function Intro() {
  return (
    <div>
      <h1 className="responsive-headline">{aboutData.intro.headline}</h1>
      <h3>{aboutData.intro.blurb}</h3>
    </div>
  );
}

export default Intro;
