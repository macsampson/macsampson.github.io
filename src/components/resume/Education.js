import React from "react";
import School from "./School";
import resumeData from "../../data/resumeData";

function Education() {
  var educationComps = resumeData.education.map(school => (
    <School
      logo={school.logo}
      school={school.school}
      program={school.program}
      dates={school.dates}
    />
  ));

  return (
    <div className="row education">
      <div className="two columns header-col">
        <h1>
          <span>Education</span>
          {/* <i className="fa fa-graduation-cap" /> */}
        </h1>
      </div>
      <div className="ten columns main-col">{educationComps}</div>
    </div>
  );
}

export default Education;
