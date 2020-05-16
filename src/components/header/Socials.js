import React from "react";
import Social from "./Social";
import socialData from "../../data/socialsData";

function Socials() {
  const socialsComps = socialData.map(social => (
    <Social link={social.link} icon={social.icon} />
  ));

  return <ul className="social">{socialsComps}</ul>;
}

export default Socials;
