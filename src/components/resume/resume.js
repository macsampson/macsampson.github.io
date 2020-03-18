import React, { Component } from "react";
import Job from "./job";
import School from "./school";

class Resume extends Component {
  state = {};
  render() {
    return (
      <section id="resume">
        {/* Education
                ----------------------------------------------- */}
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
              {/* <i className="fa fa-graduation-cap" /> */}
            </h1>
          </div>
          <div className="nine columns main-col">
            <School
              school="University of British Columbia"
              program="Bachelor of Computer Science"
              dates="Sept 2014 - May 2018"
            />
            {/* <School
              school="Thompson Rivers University"
              program="Bachelor of Business Administration"
              dates="Sept 2008 - May 2014"
            /> */}
          </div>{" "}
          {/* main-col end */}
        </div>{" "}
        {/* End Education */}
        {/* Work
                ----------------------------------------------- */}
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Experience</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <Job
              position="Technical Artist"
              company="Electronic Arts"
              dates="Sept 2019 - Present"
              technology="C#, Python"
              desc1="• Developed solutions using Python and C# to parse, aggregate, 
                      and restructure repository assets to adhere to new conventions for upcoming game title"
              desc2="• Identify and develop automation solutions to support FIFA asset conversion 
                      processes from console to mobile/online"
              desc3=""
            />
            <Job
              position="Software Compliance Engineer Intern"
              company="SAP"
              dates="May - Dec 2017"
              technology="Python, Selenium"
              desc1="• Worked with a team to ensure that SAP operated within legal
                      compliance when software engineers wished to incorporate
                      open source components into the products they were
                      developing"
              desc2="• On my own initiative, I developed an automation tool
                      with Selenium and Python that automated many data entry
                      tasks, resulting in hundreds of hours of manual work saved"
              desc3=""
            />
            <Job
              position="Software Engineer Intern"
              company="MDA"
              dates="Jan - Sept 2016"
              technology="Javascript, HTML/CSS, C#"
              desc1="• Worked closely with the marketing team to meet their
                      requirements and ensure corporate website development stayed ahead of
                      schedule, resulting in the website being released 2 months
                      early"
              desc2="• On my own initiative, I developed an automation tool
                      with Selenium and Python that automated many data entry
                      tasks, resulting in hundreds of hours of manual work saved"
              desc3=""
            />
            <Job
              position="Software Engineering Teaching Assistant"
              company="UBC"
              dates="Sept - Dec 2015"
              technology="Python, Django, Rails"
              desc1="• Handpicked by course professor to assist in managing
                      instructor workload"
              desc2="• Led weekly 2-hour lab sessions to ensure sprint
                      progression by providing students with technical guidance
                      and leadership for their web application projects"
              desc3=""
            />
          </div>{" "}
          {/* main-col end */}
        </div>{" "}
        {/* End Work */}
        {/* Skills
                ----------------------------------------------- */}
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
              Python, JavaScript, C#, Java, SQL
            </p>
            <p>
              <span>
                <strong>Other: </strong>
              </span>
              React, Docker, Node.js, AWS, MongoDB, Selenium, Express.js,
              HTML5/CSS3
            </p>
            {/* <div className="bars">
              <ul className="skills">
                <li>
                  <span className="bar-expand photoshop" />
                  <em>Python</em>
                </li>
                <li>
                  <span className="bar-expand illustrator" />
                  <em>React</em>
                </li>
                <li>
                  <span className="bar-expand wordpress" />
                  <em>Javascript</em>
                </li>
                <li>
                  <span className="bar-expand css" />
                  <em>CSS</em>
                </li>
                <li>
                  <span className="bar-expand html5" />
                  <em>HTML5</em>
                </li>
                <li>
                  <span className="bar-expand jquery" />
                  <em>jQuery</em>
                </li>
              </ul>
            </div> */}
            {/* end skill-bars */}
          </div>{" "}
          {/* main-col end */}
        </div>{" "}
        {/* End skills */}
      </section>
    );
  }
}

export default Resume;
