import React from "react";

function Tech(props) {
  return (
    <div className="two columns">
      <div>
        <img className="tech-logo" src={props.logo} alt={props.alt} />
      </div>
      <strong>{props.name}</strong>
    </div>
  );
}

export default Tech;
