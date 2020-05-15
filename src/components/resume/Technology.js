import React from "react";
import { languages, tech } from "../../resumeData";

function Technology() {
  return (
    <div className="row skill">
      <div className="three columns header-col">
        <h1>
          <span>Technologies</span>
        </h1>
      </div>
      <div className="nine columns main-col">
        <p>
          <span>
            <strong>Languages: </strong>
          </span>
          {languages.join(", ")}
        </p>
        <p>
          <span>
            <strong>Other: </strong>
          </span>
          {tech.join(", ")}
        </p>
        {/* <div className="bars">
              <ul className="skills">
                <li>
                  <span className="bar-expand illustrator" />
                  <em>React</em>
                </li>
              </ul>
            </div> */}
        {/* end skill-bars */}
      </div>{" "}
      {/* main-col end */}
    </div>
  );
}

export default Technology;
