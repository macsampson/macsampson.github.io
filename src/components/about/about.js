import React, { Component } from 'react'

class About extends Component {
  state = {}
  render() {
    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src="images/profile_pic1.png" alt />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>
              I am a recent CS graduate from the University of British Columbia
              who is passionate about using technology to improve the daily
              lives of people. I find building things addictive - whether it's
              software, a website, a game, or a piece of art.
              <br />
              <br />
              When I'm not coding my next project, I enjoy spending time:
              <li>Gaming</li>
              <li>Weightlifting</li>
              <li>Drawing</li>
              <li>Watching eSports on Twitch</li>
              <li>Discovering new functional prints for my 3D printer</li>
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
                    // Remember to replace www.dropbox.com with dl.dropboxusercontent.com in order to do a direct download!
                    // Also run "npm run deploy" to deploy this website..
                    href="https://dl.dropboxusercontent.com/s/9gwdl5xra0avfm6/MSampson%20Resume%202019%204.1.pdf?dl=0"
                    className="button"
                  >
                    <i className="fa fa-download" />
                    Download Resume
                  </a>
                </p>
              </div>
            </div>{' '}
            {/* end row */}
          </div>{' '}
          {/* end .main-col */}
        </div>
      </section>
    )
  }
}

export default About
