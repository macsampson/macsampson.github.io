import React, { Component } from "react";
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
              <i className="fa fa-graduation-cap" />
            </h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                <h3>University of British Columbia</h3>
                <p className="info">
                  Bachelor of Computer Science <span>•</span>{" "}
                  <em className="date">May 2018</em>
                </p>
                <p />
              </div>
            </div>{" "}
            {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>Thompson Rivers University</h3>
                <p className="info">
                  Bachelor of Business Administration <span>•</span>{" "}
                  <em className="date">May 2014</em>
                </p>
                <p />
              </div>
            </div>{" "}
            {/* item end */}
          </div>{" "}
          {/* main-col end */}
        </div>{" "}
        {/* End Education */}
        {/* Work
                ----------------------------------------------- */}
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                <h3>SAP</h3>
                <p className="info">
                  Software Engineer and CodeCenter Support Intern <span>•</span>{" "}
                  <em className="date">May - Dec 2017 </em>
                </p>
                <p>
                  <ul>
                    <li>
                      • Worked with a team to ensure that SAP fell within legal
                      compliance when software engineers wished to incorporate
                      open source components into the products they were
                      developing
                    </li>
                    <li>
                      • Streamlined software engineer’s development process by
                      quickly responding to their FOSS requests
                    </li>
                    <li>
                      • On my own initiative, I developed an automation tool
                      with Selenium and Python that automated many data entry
                      tasks, resulting in hundreds of hours of manual work saved
                    </li>
                  </ul>
                </p>
              </div>
            </div>{" "}
            {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>MDA</h3>
                <p className="info">
                  Software Engineer Intern <span>•</span>{" "}
                  <em className="date">Jan - Sept 2016</em>
                </p>
                <p>
                  <ul>
                    <li>
                      • Developed and integrated the new corporate website with
                      a web content management platform in order for easy
                      maintenance by the marketing team after release
                    </li>

                    <li>
                      • Worked closely with the marketing team to meet their
                      requirements and ensure development stayed ahead of
                      schedule, resulting in the website being released 2 months
                      early
                    </li>

                    <li>
                      • Improved website performance across all major browsers
                      by using their respective network monitoring tools to
                      analyze script load times and refactoring any code
                      redundancies
                    </li>

                    <li>
                      • Maintained internal legacy applications by promptly
                      handling change requests and bug fixes
                    </li>
                    <li>
                      • Ensured reliability by configuring webserver security
                      and network settings during new site roll out
                    </li>
                  </ul>
                </p>
              </div>
            </div>{" "}
            {/* item end */}
            <div className="row item">
              <div className="twelve columns">
                <h3>UBC</h3>
                <p className="info">
                  Software Engineering Teaching Assistant <span>•</span>{" "}
                  <em className="date">Sept - Dec 2015</em>
                </p>
                <p>
                  <ul>
                    <li>
                      • Handpicked by course professor to assist in managing
                      instructor workload
                    </li>

                    <li>
                      • Provided individual and group guidance with course
                      material by responding to student inquiries via online
                      forum
                    </li>
                    <li>
                      • Led weekly 2-hour lab sessions to ensure sprint
                      progression by providing students with technical guidance
                      and leadership for their web application projects
                    </li>
                    <li>• Marked exams and graded final group projects</li>
                  </ul>
                </p>
              </div>
            </div>{" "}
            {/* item end */}
          </div>{" "}
          {/* main-col end */}
        </div>{" "}
        {/* End Work */}
        {/* Skills
                ----------------------------------------------- */}
        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <p>
              <span>
                <strong>Languages: </strong>
              </span>
              Python, TypeScript/JavaScript, Java, HTML/CSS, SQL
            </p>
            <p>
              <span>
                <strong>Libraries: </strong>
              </span>
              React
            </p>
            <p>
              <span>
                <strong>Frameworks: </strong>
              </span>
              Selenium, Express
            </p>
            <p>
              <span>
                <strong>Tools: </strong>
              </span>
              Git, Eclipse, JIRA, Visual Studio, VirtualBox, Docker, NodeJS,
              MongoDB
            </p>
            <p>
              <span>
                <strong>Systems: </strong>
              </span>
              Linux, Windows, macOS
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
