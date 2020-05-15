import React from "react";

function Art(props) {
  return (
    <div>
      <div className="columns portfolio-item">
        <div className="item-wrap">
          <a href={"#" + props.modal} title>
            <img alt={props.alt} src={props.img} />
            <div className="overlay">
              <div className="portfolio-item-meta">
                <h5>{props.name}</h5>
                <p>{props.type}</p>
              </div>
            </div>
            <div className="link-icon">
              <i className="icon-plus" />
            </div>
          </a>
        </div>
      </div>

      <div id={props.modal} className="popup-modal mfp-hide">
        <img className="scale-with-grid" src={props.modalImg} />
        <div className="description-box">
          <h4>{props.name}</h4>
          <p>{props.desc}</p>
        </div>
        <div className="link-box">
          <a href={props.link} target="_blank">
            View on Artstation
          </a>
          <a className="popup-modal-dismiss">Close</a>
        </div>
      </div>
    </div>
  );
}

export default Art;
