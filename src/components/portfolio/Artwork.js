import React from "react";
import Art from "./Art";
import resumeData from "../../resumeData";

function Artwork() {
  const artComps = resumeData.artwork.map(art => (
    <Art
      name={art.name}
      type={art.type}
      modal={art.modal}
      img={art.img}
      alt={art.alt}
      desc={art.desc}
      modalName={art.modalName}
      link={art.link}
      modalImg={art.modalImg}
    />
  ));

  return (
    <div id="art" className="row">
      <div className="twelve columns collapsed">
        <h1>Artwork</h1>
        <div
          id="portfolio-wrapper"
          className="bgrid-quarters s-bgrid-thirds cf"
        >
          {artComps}
        </div>
      </div>
    </div>
  );
}

export default Artwork;
