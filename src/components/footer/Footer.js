import React, { Component } from "react";
import Socials from "../header/Socials";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <Socials />
            <ul className="copyright">
              <li>© Copyright 2018 Mac Sampson</li>
              <li>
                Medium Icon by{" "}
                <a title="flaticon" href="http://www.flaticon.com/">
                  Freepik from www.flaticon.com
                </a>
              </li>
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
