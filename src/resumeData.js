const resumeData = {
  experience: [
    {
      id: 0,
      position: `Technical Artist`,
      company: `Electronic Arts`,
      logo: `images/ea.png`,
      dates: `Sept 2019 - Present`,
      technology: `C#, Python`,
      desc1: `• Developed solutions using Python and C# to parse, aggregate, and restructure repository assets to adhere to new conventions for upcoming game title`,
      desc2: `• Identify and develop automation solutions to support FIFA asset conversion processes from console to mobile/online`,
      desc3: ``
    },
    {
      id: 1,
      position: `Software Compliance Engineer Intern`,
      company: `SAP`,
      logo: `images/sap.png`,
      dates: `May - Dec 2017`,
      technology: `Python, Selenium`,
      desc1: `• Worked with a team to ensure that SAP operated within legal compliance when software engineers wished to incorporate
                      open source components into the products they were
                      developing`,
      desc2: `• On my own initiative, I developed an automation tool
                      with Selenium and Python that automated many data entry
                      tasks, resulting in hundreds of hours of manual work saved`,
      desc3: ``
    },
    {
      id: 2,
      position: `Software Engineer Intern`,
      company: `MDA`,
      logo: `images/mda.png`,
      dates: `Jan - Sept 2016`,
      technology: `Javascript, HTML/CSS, C#`,
      desc1: `• Worked closely with the marketing team to meet their
                      requirements and ensure corporate website development stayed ahead of
                      schedule, resulting in the website being released 2 months
                      early`,
      desc2: `• On my own initiative, I developed an automation tool
                      with Selenium and Python that automated many data entry
                      tasks, resulting in hundreds of hours of manual work saved`,
      desc3: ``
    },
    {
      id: 3,
      position: `Software Engineering Teaching Assistant`,
      company: `UBC`,
      logo: `images/ubc.png`,
      dates: `Sept - Dec 2015`,
      technology: `Python, Django, Rails`,
      desc1: `• Handpicked by course professor to assist in managing
                      instructor workload`,
      desc2: `• Led weekly 2-hour lab sessions to ensure sprint
                      progression by providing students with technical guidance
                      and leadership for their web application projects`,
      desc3: ``
    }
  ],
  education: [
    {
      logo: `images/ubc.png`,
      school: `University of British Columbia`,
      program: `Bachelor of Computer Science`,
      dates: `Sept 2014 - May 2018`
    }
    // {
    //   school: `Thompson Rivers University`,
    //   program: `Bachelor of Business Administration`,
    //   dates: `Sept 2008 - May 2014`
    // }
  ],
  languages: [`TypeScript`, `C#`, `Python`, `Java`, `SQL`],
  tech: [
    `React`,
    `Docker`,
    `Node.js`,
    `AWS`,
    `MongoDB`,
    `Selenium`,
    `Express.js`,
    `HTML5/CSS3`
  ],
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
      link: `https://github.com/macsampson/VanCity-Parking`,
      modalImg: `images/portfolio/modals/parkr.jpg`,
      isLive: true,
      appLink: `http://www.vancityparking.com/`
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
      link: `https://github.com/macsampson/GameDeals-Aggregator`,
      isLive: false,
      modalImg: `images/portfolio/modals/gamedeals.jpg`
    }
  ],
  artwork: {
    display: false,
    art: [
      {
        name: `Panther`,
        type: `Illustration`,
        modal: `modal-03`,
        img: `images/portfolio/panther_tile.jpg`,
        alt: `panther`,
        modalName: `Wakanda Forever`,
        desc: `Recreated a piece in Photoshop originally done by one of my
                favourite illustrators: @marcusthevisual`,
        link: `https://www.artstation.com/artwork/aREzGz`,
        modalImg: `images/portfolio/modals/panther_large.jpg`
      },
      {
        name: `Tracer`,
        type: `Illustration`,
        modal: `modal-04`,
        img: `images/portfolio/tracer_tile.jpg`,
        alt: `tracer`,
        modalName: `Cheers, Love`,
        desc: `My first attempt at digital art. I painted this in Photoshop just
                before the release of Overwatch.`,
        link: `https://www.artstation.com/artwork/aaZXq`,
        modalImg: `images/portfolio/modals/tracer_large.jpg`
      },
      {
        name: `Emma`,
        type: `Illustration`,
        modal: `modal-05`,
        img: `images/portfolio/emma_tile.jpg`,
        alt: `emma`,
        modalName: `Amortentia`,
        desc: `I watched too much Harry Potter during my impressionable years.`,
        link: `https://www.artstation.com/artwork/qAo1eL`,
        modalImg: `images/portfolio/modals/emma_large.jpg`
      }
    ]
  }
};

export default resumeData;
