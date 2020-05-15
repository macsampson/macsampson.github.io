import React from "react";
import School from "./School";
import resumeData from "../../resumeData";

function Education() {
  var educationComps = resumeData.education.map(school => (
    <School
      school={school.school}
      program={school.program}
      dates={school.dates}
    />
  ));

  return (
    <div className="row education">
      <div className="three columns header-col">
        <h1>
          <span>Education</span>
          {/* <i className="fa fa-graduation-cap" /> */}
        </h1>
      </div>
      <div className="nine columns main-col">{educationComps}</div>{" "}
      {/* main-col end */}
    </div>
  );
}

export default Education;
