import React from "react";

function Project(props) {
  return (
    <div>
      <div className="columns portfolio-item">
        <div className="item-wrap">
          <a href={"#" + props.modal}>
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
        <img className="scale-with-grid" src={props.modalImg} alt="grid" />
        <div className="description-box">
          <h4>{props.name}</h4>
          <p>{props.desc}</p>
        </div>
        <div className="link-box">
          {/* Check to see if the project is live or not */}
          {props.isLive ? (
            <a
              id="view-app"
              href={props.appLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to App
            </a>
          ) : null}

          {props.link ? (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          ) : null}
          <a className="popup-modal-dismiss">Close</a>
        </div>
      </div>
    </div>
  );
}

export default Project;
