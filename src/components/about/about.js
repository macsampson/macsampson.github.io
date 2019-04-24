import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src="images/profile_pic1.jpg" alt />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>
              I am a recent CS graduate from the University of British Columbia
              who is passionate about using technology to improve the daily
              lives of people. I find building things addictive; whether it's a
              piece of software, a web site, a business, a game, or a piece of
              art; utilizing the resources around me to create something
              meaningful never ceases to excite me.
              <br />
              <br />
              Some of my non-coding hobbies include: drawing, gaming, sailing,
              and weightlifting.
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
              <div className="columns download">
                <p>
                  <a
                    href="https://www.dropbox.com/s/6voo3z8z8448591/MSampson%20Resume%202018%203.1.pdf?dl=0"
                    className="button"
                  >
                    <i className="fa fa-download" />
                    Download Resume
                  </a>
                </p>
              </div>
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
