import React, { Component } from "react";

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
              I am a software engineer/web developer who is passionate about
              figuring out ways to use technology to improve people's quality of
              life. I believe that the internet will increasingly be the backbone of the
              future; because of this, I'm always striving to learn new web technologies.
              <br />
              <br />
              Outside of engineering, I enjoy spending time setting up new projects on my Raspberri Pi, finding new and
              useful ways to utilize my 3D printer, and gathering friends together for late night gaming sessions.
            </p>
            <div className="row">
              {/* <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>Mac Sampson</span>
                  <br />
                  <span>mackenzie.sampson@outlook.com</span>
                </p>
              </div> */}
              {/* <div className="columns download">
                <p>
                  <a
                    // Remember to replace www.dropbox.com with dl.dropboxusercontent.com in order to do a direct download!
                    // Also run "npm run deploy" to deploy this website..
                    href="https://hired.com/resumes/mac-sampson"
                    className="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-download" />
                    View PDF Resume
                  </a>
                </p>
              </div> */}
            </div>{" "}
            {/* end row */}
          </div>{" "}
          {/* end .main-col */}
        </div>
      </section>
    );
  }
}

export default About;
