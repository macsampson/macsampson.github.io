import React from "react";

function NavSection(props) {
  return (
    <li>
      <a className="smoothscroll" href={"#" + props.href}>
        {props.name}
      </a>
    </li>
  );
}

export default NavSection;
