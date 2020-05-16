import React from "react";
import resumeData from "../../resumeData";
import Tech from "./Tech";

function Technologies() {
  const techComps = resumeData.tech.map(tech => (
    <Tech name={tech.name} logo={tech.logo} />
  ));

  return (
    <div className="row skill">
      <div className="two columns header-col">
        <h1>
          <span>Technologies</span>
        </h1>
      </div>
      <div className="ten columns main-col">{techComps}</div>
      {/* <div className="bars">
              <ul className="skills">
                <li>
                  <span className="bar-expand illustrator" />
                  <em>React</em>
                </li>
              </ul>
            </div> */}
      {/* end skill-bars */}
    </div>
  );
}

export default Technologies;
