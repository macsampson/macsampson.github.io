import React, { Component } from "react";
import aboutData from "../../data/aboutData";
import DownloadResume from "./DownloadResume";

class About extends Component {
  state = {};
  render() {
    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src="images/profile_pic1.png"
              alt="profile pic"
            />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>
              {aboutData.aboutMe.p1}
              <br />
              <br />
              {aboutData.aboutMe.p2}
            </p>
          </div>
        </div>
        {/* <DownloadResume /> */}
      </section>
    );
  }
}

export default About;
