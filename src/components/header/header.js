import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    let resumeData = this.props.resumeData;
    return (
      <header id="home">
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#" title="Hide navigation">
            Hide navigation
          </a>
          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#portfolio">
                Projects
              </a>
            </li>
            {/* <li>
              <a className="smoothscroll" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li> */}
          </ul>{" "}
          {/* end #nav */}
        </nav>{" "}
        {/* end #nav-wrap */}
        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">Hey, I'm {resumeData.name}.</h1>
            <h3>
              I'm a Vancouver-based <span>{resumeData.role}</span> and{" "}
              <span>Illustrator. </span>
              <a className="smoothscroll" href="#about">
                Start scrolling{" "}
              </a>
              to learn more{" "}
              <a className="smoothscroll" href="#about">
                about me
              </a>
              .
            </h3>
            <hr />
            <ul className="social">
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
          </div>
        </div>
        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle" />
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
