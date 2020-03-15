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
              I am a software engineer/web developer. I'm passionate about
              figuring out ways to use technology to improve people's quality of
              life. I believe that the internet will be the backbone of the
              future and I'm always striving to learn new web technology.
              <br />
              <br />
              {/* When I'm not coding my next project, I enjoy spending time:
              <li>Gaming</li>
              <li>Bodybuilding</li>
              <li>Drawing</li>
              <li>Watching Twitch</li>
              <li>3D printing</li> */}
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
                    href="https://dl.dropboxusercontent.com/s/r4jcs18w2ify1cx/msampson%20resume%202019%207.0.pdf?dl=0"
                    className="button"
                  >
                    <i className="fa fa-download" />
                    Download Resume
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
