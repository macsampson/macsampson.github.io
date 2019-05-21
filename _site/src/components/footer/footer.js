import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              <li>
                <a href="https://github.com/macsampson" target="_blank">
                  <i className="fa fa-github" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/macsampson" target="_blank">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/themacsampson" target="_blank">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/themacsampson" target="_blank">
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a href="mailto:mackenzie.sampson@outlook.com" target="_blank">
                  <i className="fa fa-envelope" />
                </a>
              </li>
            </ul>
            {/* <ul className="copyright">
              <li>© Copyright 2018 Mac Sampson</li>
              <li>
                Design by{" "}
                <a title="Styleshout" href="http://www.styleshout.com/">
                  Styleshout
                </a>
              </li>
            </ul> */}
          </div>
          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
