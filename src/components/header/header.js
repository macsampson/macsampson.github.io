import React, { Component } from "react";

class Header extends Component {
  state = {};

  

  componentDidMount() {
    let today = new Date(),
    hour = today.getHours();

    // Change the background based on what time of day it is
    if ( hour >= 5 && hour < 7){
      document.getElementById("home").style.backgroundImage = "url(../images/0.png)";
    } else if (hour >= 7 && hour < 9){
      document.getElementById("home").style.backgroundImage = "url(../images/1.png)";
    } else if (hour >= 9 && hour < 12){
      document.getElementById("home").style.backgroundImage = "url(../images/2.png)";
    } else if (hour >= 12 && hour < 18){
      document.getElementById("home").style.backgroundImage = "url(../images/2a.jpg)";
    } else if (hour >= 18 && hour < 20){
      document.getElementById("home").style.backgroundImage = "url(../images/3.png)";
    } else if (hour >= 20 && hour < 21){
      document.getElementById("home").style.backgroundImage = "url(../images/4.png)";
    } else if (hour >= 21 && hour <= 22){
      document.getElementById("home").style.backgroundImage = "url(../images/5.png)";
    } else if (hour > 22 || hour < 3){
      document.getElementById("home").style.backgroundImage = "url(../images/6.png)";
    } else if (hour >= 3 && hour < 5){
      document.getElementById("home").style.backgroundImage = "url(../images/7.png)";
    }
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
              I'm a Vancouver-based software engineer and{" "}
              <span>hobbyist illustrator. </span>
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
