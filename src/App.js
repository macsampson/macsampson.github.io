import React, { Component } from "react";
import Header from "./components/header/header";
import About from "./components/about/about";
import Resume from "./components/resume/Resume";
import Portfolio from "./components/portfolio/portfolio";
import Footer from "./components/footer/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <About />
        <Resume />
        <Portfolio />
        <Footer />
      </div>
    );
  }
}

export default App;
