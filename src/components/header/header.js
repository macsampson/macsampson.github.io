import React, { Component } from "react";

class Header extends Component {
  state = {};

  componentDidMount() {
    // let today = new Date();
    // hour = today.getHours();
    // Change the background based on what time of day it is (Deer background)
    // if (hour >= 5 && hour < 8) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/0deer.jpg)";
    // } else if (hour >= 8 && hour < 12) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/1deer.jpg)";
    //   document
    //     .getElementById("home")
    //     .getElementsByTagName("h3")[0].style.color = "#535F67";
    // } else if (hour >= 12 && hour < 15) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/2deer.jpg)";
    //   document
    //     .getElementById("home")
    //     .getElementsByTagName("h3")[0].style.color = "#535F67";
    // } else if (hour >= 15 && hour < 19) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/3deer.jpg)";
    //   document
    //     .getElementById("home")
    //     .getElementsByTagName("h3")[0].style.color = "#535F67";
    // } else if (hour >= 19 && hour < 21) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/4deer.jpg)";
    // } else if (hour >= 21 && hour < 23) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/5deer.jpg)";
    // } else if (hour >= 23 || hour < 5) {
    //   document.getElementById("home").style.backgroundImage =
    //     "url(../images/6deer.jpg)";
    // }
  }

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
              I'm a software engineer currently based in Vancouver, Canada.
              Start scrolling to learn more about me.
            </h3>
            <hr />
            <ul className="social">
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
          </div>
        </div>
        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-open" />
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
