import React, { Component } from "react";
class Artwork extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="columns portfolio-item">
          <div className="item-wrap">
            <a href={"#" + this.props.modal} title>
              <img alt={this.props.alt} src={this.props.img} />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{this.props.name}</h5>
                  <p>{this.props.type}</p>
                </div>
              </div>
              <div className="link-icon">
                <i className="icon-plus" />
              </div>
            </a>
          </div>
        </div>

        <div id={this.props.modal} className="popup-modal mfp-hide">
          <img className="scale-with-grid" src={this.props.modalImg} alt />
          <div className="description-box">
            <h4>{this.props.name}</h4>
            <p>{this.props.desc}</p>
          </div>
          <div className="link-box">
            <a href={this.props.link} target="_blank">
              View on Artstation
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Artwork;
