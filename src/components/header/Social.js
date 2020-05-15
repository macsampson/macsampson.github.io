import React from "react";

function Social(props) {
  return (
    <li>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <i className={props.icon} />
      </a>
    </li>
  );
}

export default Social;
