import React from "react";
import resumeData from "../../resumeData";
import Project from "./Project";

function Projects() {
  const projectComps = resumeData.projects.map(project => (
    <Project
      name={project.name}
      type={project.type}
      modal={project.modal}
      img={project.img}
      alt={project.alt}
      desc={project.desc}
      link={project.link}
      isLive={project.isLive}
      modalImg={project.modalImg}
      appLink={project.appLink}
    />
  ));

  return (
    <div id="coding" className="row">
      <div className="twelve columns collapsed">
        <h1>Projects</h1>
        <div
          id="portfolio-wrapper"
          className="bgrid-quarters s-bgrid-thirds cf"
        >
          {projectComps}
        </div>
      </div>
    </div>
  );
}

export default Projects;
