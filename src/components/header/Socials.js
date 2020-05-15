import React from "react";
import Social from "./Social";
import socialData from "../../socialsData";

const socialsComps = socialData.map(social => (
  <Social link={social.link} icon={social.icon} />
));

function Socials() {
  return <ul className="social">{socialsComps}</ul>;
}

export default Socials;
