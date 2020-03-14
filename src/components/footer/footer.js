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
                <a
                  href="https://github.com/macsampson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/macsampson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@mackenzie.sampson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-medium-m" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/themacsampson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter" />
                </a>
              </li>
              {/* <li>
                <a
                  href="https://instagram.com/themacsampson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram" />
                </a>
              </li> */}
              <li>
                <a
                  href="mailto:mackenzie.sampson@outlook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-envelope" />
                </a>
              </li>
            </ul>
            <ul className="copyright">
              <li>© Copyright 2018 Mac Sampson</li>
              {/* <li>
                Medium Icon by{" "}
                <a title="flaticon" href="http://www.flaticon.com/">
                  Freepik from www.flaticon.com
                </a>
              </li> */}
            </ul>
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
