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
                      • Saved hundreds of hours of manual work by initiating
                      development of a Python script that utilized Selenium to
                      automate many data entry tasks
                    </li>
                    <li>
                      • Supported software engineers by scanning and creating
                      FOSS components within SAP’s internal database in order to
                      be risk rated by analysts
                    </li>
                    <li>
                      • Streamlined software engineer’s development process by
                      quickly responding to their FOSS requests
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
                      • Successfully achieved early release of new corporate
                      website by maintaining constant and open communication
                      with the marketing team, in order to determine essential
                      and practical features to implement in the final release
                    </li>

                    <li>
                      • Improved website performance by using browser dev tools
                      to monitor script load times and refactoring redundancies
                    </li>

                    <li>
                      • Maintained internal company applications by promptly
                      responding to update requests, bug fixes and developing
                      additional features
                    </li>

                    <li>
                      • Ensured site reliability by monitoring performance and
                      settings within IIS
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
                      • Provided individual and group guidance regarding course
                      material by responding to student inquiries via online
                      forum
                    </li>

                    <li>
                      • Facilitated weekly lab sessions by assisting students
                      with their web application projects
                    </li>
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
              Python, JavaScript, Java, HTML/CSS, C, SQL
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
              Selenium, Django
            </p>
            <p>
              <span>
                <strong>Tools: </strong>
              </span>
              Git, Eclipse, JIRA, Visual Studio, VirtualBox
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
