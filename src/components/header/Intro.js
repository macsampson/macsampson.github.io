import React from "react";
import textData from "../../textData";

function Intro() {
  return (
    <div>
      <h1 className="responsive-headline">{textData.intro.headline}</h1>
      <h3>{textData.intro.blurb}</h3>
    </div>
  );
}

export default Intro;
