import React, { Component } from "react";
class Job extends Component {
  state = {};
  render() {
    return (
      <div className="row item">
        <div className="twelve columns">
          <h3>{this.props.position}</h3>
          <p className="info">
            {this.props.company} <span>•</span>{" "}
            <em className="date">{this.props.dates} </em>
          </p>
          <p>
            <ul>
              <li>{this.props.desc1}</li>
              <li>{this.props.desc2}</li>
              <li>{this.props.desc3}</li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
}

export default Job;
