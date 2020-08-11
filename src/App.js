import React, { Component } from "react";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Resume from "./components/resume/Resume";
import Portfolio from "./components/portfolio/Portfolio";
import Footer from "./components/footer/Footer";
import Nav from './components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <Nav />
        <About />
        <Portfolio />
        <Resume />
        <Footer />
      </div>
    );
  }
}

export default App;
