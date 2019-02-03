import React, { Component } from "react";

class Portfolio extends Component {
  state = {};
  render() {
    return (
      <section id="portfolio">
        <div id="coding" className="row">
          <div className="twelve columns collapsed">
            <h1>Coding</h1>
            {/* portfolio-wrapper */}
            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            >
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <a href="#modal-01" title>
                    <img alt src="images/portfolio/gamedeals_tile.jpg" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>Game Dealer</h5>
                        <p>Django App</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="icon-plus" />
                    </div>
                  </a>
                </div>
              </div>{" "}
              {/* item end */}
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <a href="#modal-02" title>
                    <img alt src="images/portfolio/parkr_tile.jpg" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>VanCity Parkr</h5>
                        <p>Rails App</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="icon-plus" />
                    </div>
                  </a>
                </div>
              </div>{" "}
              {/* item end */}
            </div>{" "}
            {/* portfolio-wrapper end */}
          </div>{" "}
          {/* twelve columns end */}
        </div>{" "}
        {/* row End */}
        <br />
        <br />
        <div id="art" className="row">
          <div className="twelve columns collapsed">
            <h1>Artwork</h1>
            {/* portfolio-wrapper */}
            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            >
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <a href="#modal-03" title>
                    <img alt src="images/portfolio/panther_tile.jpg" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>Panther</h5>
                        <p>Illustration</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="icon-plus" />
                    </div>
                  </a>
                </div>
              </div>{" "}
              {/* item end */}
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <a href="#modal-04" title>
                    <img alt src="images/portfolio/tracer_tile.jpg" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>Tracer</h5>
                        <p>Illustration</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="icon-plus" />
                    </div>
                  </a>
                </div>
              </div>{" "}
              {/* item end */}
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <a href="#modal-05" title>
                    <img alt src="images/portfolio/emma_tile.jpg" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>Emma</h5>
                        <p>Portrait</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="icon-plus" />
                    </div>
                  </a>
                </div>
              </div>{" "}
              {/* item end */}
            </div>{" "}
            {/* portfolio-wrapper end */}
          </div>{" "}
          {/* twelve columns end */}
        </div>{" "}
        {/* row End */}
        {/* Modal Popup
	      --------------------------------------------------------------- */}
        <div id="modal-01" className="popup-modal mfp-hide">
          <img
            className="scale-with-grid"
            src="images/portfolio/modals/gamedeals.jpg"
            alt
          />
          <div className="description-box">
            <h4>Game Dealer</h4>
            <p>
              A Django app that uses the Reddit API to pull game sale
              information from r/gamedeals and associate the games with their
              respective artwork obtained from the IGDB API.
            </p>
          </div>
          <div className="link-box">
            <a
              href="https://github.com/macsampson/GameDeals-Aggregator"
              target="_blank"
            >
              View on GitHub
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
        {/* modal-01 End */}
        <div id="modal-02" className="popup-modal mfp-hide">
          <img
            className="scale-with-grid"
            src="images/portfolio/modals/parkr.jpg"
            alt
          />
          <div className="description-box">
            <h4>VanCity Parkr</h4>
            <p>
              An app that plots all public parking meters in the Metro Vancouver
              area, along with their rates and hours of operation. There is an
              additional option to overlay a heatmap with all auto-related
              crime, so you can feel more at ease parking in certain
              neighbourhoods.
            </p>
          </div>
          <div className="link-box">
            <a
              href="https://github.com/macsampson/VanCity-Parkr"
              target="_blank"
            >
              View on GitHub
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
        {/* modal-02 End */}
        <div id="modal-03" className="popup-modal mfp-hide">
          <img
            className="scale-with-grid"
            src="images/portfolio/modals/panther_large.jpg"
            alt
          />
          <div className="description-box">
            <h4>Wakanda Forever</h4>
            <p>
              Recreated a piece in Photoshop originally done by one of my
              favourite illustrators: @marcusthevisual
            </p>
            {/* <span className="categories">
                <i className="fa fa-tag" />
                Branding
              </span> */}
          </div>
          <div className="link-box">
            <a href="https://www.artstation.com/artwork/aREzGz" target="_blank">
              View on ArtStation
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
        {/* modal-03 End */}
        <div id="modal-04" className="popup-modal mfp-hide">
          <img
            className="scale-with-grid"
            src="images/portfolio/modals/tracer_large.jpg"
            alt
          />
          <div className="description-box">
            <h4>Cheers, Love</h4>
            <p>
              My first attempt at digital art. I painted this in Photoshop just
              before the release of Overwatch.
            </p>
            {/* <span className="categories">
                <i className="fa fa-tag" />
                Illustration
              </span> */}
          </div>
          <div className="link-box">
            <a href="https://www.artstation.com/artwork/aaZXq" target="_blank">
              View on ArtStation
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
        {/* modal-04 End */}
        <div id="modal-05" className="popup-modal mfp-hide">
          <img
            className="scale-with-grid"
            src="images/portfolio/modals/emma_large.jpg"
            alt
          />
          <div className="description-box">
            <h4>Amortentia</h4>
            <p>
              I watched too much Harry Potter during my developmental years.
            </p>
          </div>
          <div className="link-box">
            <a href="https://www.artstation.com/artwork/qAo1eL" target="_blank">
              View on ArtStation
            </a>
            <a className="popup-modal-dismiss">Close</a>
          </div>
        </div>
        {/* modal-05 End */}
      </section>
    );
  }
}

export default Portfolio;
