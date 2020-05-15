function Background() {
  let today = new Date();
  let hour = today.getHours();
  //    Change the background based on what time of day it is (Deer background)
  if (hour >= 5 && hour < 8) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/0deer.jpg)";
  } else if (hour >= 8 && hour < 12) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/1deer.jpg)";
    document.getElementById("home").getElementsByTagName("h3")[0].style.color =
      "#535F67";
  } else if (hour >= 12 && hour < 15) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/2deer.jpg)";
    document.getElementById("home").getElementsByTagName("h3")[0].style.color =
      "#535F67";
  } else if (hour >= 15 && hour < 19) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/3deer.jpg)";
    document.getElementById("home").getElementsByTagName("h3")[0].style.color =
      "#535F67";
  } else if (hour >= 19 && hour < 21) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/4deer.jpg)";
  } else if (hour >= 21 && hour < 23) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/5deer.jpg)";
  } else if (hour >= 23 || hour < 5) {
    document.getElementById("home").style.backgroundImage =
      "url(../images/6deer.jpg)";
  }
}

export default Background;
