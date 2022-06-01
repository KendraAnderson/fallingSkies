import {loadHeaderFooter} from "./utils.js";
import GeoApi from "./geoAPI.js";
import {getFormValues, placeDOM} from "./formPull.js";
import {placeMap} from "./formPull.js";
import Notices from "./notices.js";
import {localStore} from "./localStorage.js";
loadHeaderFooter("header", "footer");
const notices2 = new Notices();
notices2.init();
let g = new GeoApi();
g.init();
document.getElementById("submitLocation").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  let myForm = document.forms[0];
  let chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    let formGot = getFormValues();
    let userStoreName = "userLocation";
    for (let i = 0; i < formGot.length; i++) {
      let key = `ul${i}`;
      let value = formGot[i];
      localStore(userStoreName, key, value);
    }
    g.getTheDistance();
    placeDOM();
    placeMap();
  }
});
const bannerURL = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "K2Jb0JsuuypmVqpf8TxkBxcHhrlkHvCWRuC0z1tc";
fetch(bannerURL + api_key).then((response) => response.json()).then((jsObject) => {
  const bannerImg = document.createElement("img");
  bannerImg.setAttribute("src", jsObject.url);
  bannerImg.setAttribute("alt", jsObject.title);
  bannerImg.setAttribute("id", "bannerImage");
  document.querySelector(".imageBanner").appendChild(bannerImg);
});
