const projectData = {
  projects: [
    {
      name: `VanCity Parking`,
      type: `MERN App`,
      modal: `modal-01`,
      img: `images/portfolio/parkr_tile.jpg`,
      alt: `vancity`,
      desc: `A MERN app that plots all public parking meters in the Metro
                    Vancouver area, along with their rates and hours of operation.
                    There will also be an additional option to overlay a heatmap with
                    all auto-related crime, so you can feel more at ease parking in
                    certain neighbourhoods.`,
      // link: `https://github.com/macsampson/VanCity-Parking`,
      modalImg: `images/portfolio/modals/parkr.jpg`,
      isLive: true,
      appLink: `https://www.vancityparking.com/`
    },
    {
      name: `Game Deals`,
      type: `Django App`,
      modal: `modal-02`,
      img: `images/portfolio/gamedeals_tile.jpg`,
      alt: `game deals`,
      desc: `A Django app that uses the Reddit API to pull game sale
                  information from r/gamedeals and associate the games with their
                  respective artwork obtained from the IGDB API.`,
      // link: `https://github.com/macsampson/GameDeals-Aggregator`,
      isLive: false,
      modalImg: `images/portfolio/modals/gamedeals.jpg`
    }
  ]
};

export default projectData;
