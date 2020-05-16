import React, { Component } from "react";
class School extends Component {
  state = {};
  render() {
    return (
      <div className="row item">
        <div className="two columns">
          <img
            className="company-logo"
            src={this.props.logo}
            alt="company logo"
          />
        </div>
        <div className="ten columns">
          <h3>{this.props.school}</h3>
          <p className="info">
            {this.props.program} <span>•</span>{" "}
            <em className="date">{this.props.dates}</em>
          </p>
          <p />
        </div>
      </div>
    );
  }
}

export default School;
