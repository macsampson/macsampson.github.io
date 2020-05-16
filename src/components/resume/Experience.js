import React from "react";
import resumeData from "../../data/resumeData";
import Job from "./Job";

function Experience() {
  var jobComps = resumeData.experience.map(job => (
    <Job
      key={job.id}
      position={job.position}
      company={job.company}
      logo={job.logo}
      technology={job.technology}
      dates={job.dates}
      desc1={job.desc1}
      desc2={job.desc2}
    />
  ));

  return (
    <div className="row work">
      <div className="two columns header-col">
        <h1>
          <span>Experience</span>
        </h1>
      </div>
      <div className="ten columns main-col">{jobComps}</div>
      {/* main-col end */}
    </div>
  );
}

export default Experience;
