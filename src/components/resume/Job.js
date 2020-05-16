import React from "react";

function Job(props) {
  return (
    <div className="row item">
      <div className="two columns">
        <img className="company-logo" src={props.logo} alt="company logo" />
      </div>
      <div className="ten columns">
        <h3>{props.position}</h3>
        <p className="info">
          {props.company} <span>•</span>{" "}
          <em className="technology">{props.technology} </em>
          <span>•</span> <em className="date">{props.dates} </em>
        </p>

        <ul>
          <li>{props.desc1}</li>
          <li>{props.desc2}</li>
          <li>{props.desc3}</li>
        </ul>
      </div>
    </div>
  );
}

export default Job;
