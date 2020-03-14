import React, { Component } from "react";
import Project from "./project";
// import Artwork from "./artwork";

class Portfolio extends Component {
  render() {
    return (
      <section id="portfolio">
        <div id="coding" className="row">
          <div className="twelve columns collapsed">
            <h1>Projects</h1>
            {/* portfolio-wrapper */}
            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            >
              <Project
                name="VanCity Parking"
                type="MERN App"
                modal="modal-01"
                img="images/portfolio/parkr_tile.jpg"
                alt="vancity"
                desc="A MERN app that plots all public parking meters in the Metro
                Vancouver area, along with their rates and hours of operation.
                There will also be an additional option to overlay a heatmap with
                all auto-related crime, so you can feel more at ease parking in
                certain neighbourhoods."
                link="https://github.com/macsampson/VanCity-Parking"
                modalImg="images/portfolio/modals/parkr.jpg"
                isLive={true}
                appLink="http://www.vancityparking.com/"
              />
              <Project
                name="Game Deals"
                type="Django App"
                modal="modal-02"
                img="images/portfolio/gamedeals_tile.jpg"
                alt="game deals"
                desc="A Django app that uses the Reddit API to pull game sale
              information from r/gamedeals and associate the games with their
              respective artwork obtained from the IGDB API."
                link="https://github.com/macsampson/GameDeals-Aggregator"
                isLive={false}
                modalImg="images/portfolio/modals/gamedeals.jpg"
              />
            </div>{" "}
            {/* portfolio-wrapper end */}
          </div>{" "}
          {/* twelve columns end */}
        </div>{" "}
        <br />
        <br />
        {/* <div id="art" className="row">
          <div className="twelve columns collapsed">
            <h1>Artwork</h1> */}
        {/* portfolio-wrapper */}
        {/* <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            > */}
        {/* <Artwork
                name="Panther"
                type="Illustration"
                modal="modal-03"
                img="images/portfolio/panther_tile.jpg"
                alt="panther"
                modalName="Wakanda Forever"
                desc="Recreated a piece in Photoshop originally done by one of my
                favourite illustrators: @marcusthevisual"
                link="https://www.artstation.com/artwork/aREzGz"
                modalImg="images/portfolio/modals/panther_large.jpg"
              />
              <Artwork
                name="Tracer"
                type="Illustration"
                modal="modal-04"
                img="images/portfolio/tracer_tile.jpg"
                alt="tracer"
                modalName="Cheers, Love"
                desc="My first attempt at digital art. I painted this in Photoshop just
                before the release of Overwatch."
                link="https://www.artstation.com/artwork/aaZXq"
                modalImg="images/portfolio/modals/tracer_large.jpg"
              />
              <Artwork
                name="Emma"
                type="Illustration"
                modal="modal-05"
                img="images/portfolio/emma_tile.jpg"
                alt="emma"
                modalName="Amortentia"
                desc="I watched too much Harry Potter during my impressionable years."
                link="https://www.artstation.com/artwork/qAo1eL"
                modalImg="images/portfolio/modals/emma_large.jpg"
              /> */}
        {/* </div>{' '} */}
        {/* portfolio-wrapper end
          </div>{' '} */}
        {/* twelve columns end */}
        {/* </div> */}
      </section>
    );
  }
}

export default Portfolio;
