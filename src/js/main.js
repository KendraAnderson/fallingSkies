import { loadHeaderFooter } from "./utils.js";
import { convertToJson } from "./utils.js";
import GeoApi from "./geoAPI.js";
import {placeDOM} from './formPull';
import {placeMap} from './formPull';
import { distance } from "./utils.js"
import Notices from './notices.js';


//Call displayHeaderFooter
loadHeaderFooter("header", "footer")

//Display the default map
let defaultMap = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" 
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=50+N+W+Temple+St,Salt+Lake+City%2C+UT+84150" 
        frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
    
    document.getElementById('mapouter').innerHTML = defaultMap;

//Create an instance of notices
const notices = new Notices();
notices.init();

//Call other functions to run program...

// initialize GeoApi
let g = new GeoApi();
g.init();
let convertedLat = await g.reversePGet('53.615557','-113.369965');

document.getElementById('submitLocation').addEventListener('click', (e) => {
    e.preventDefault();
    let myForm = document.forms[0];
    let chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
        console.log(g.forwardPGet());
        g.getTheDistance();

        placeDOM();
        placeMap();
        

    }
});



//index.html button trigger
document.getElementById('consoleButton').addEventListener("click", () => { g.forwardPGet()});
document.getElementById('consoleButton2').addEventListener("click", () => { 
        (console.log(`ConvertedLat: ${convertedLat}`));
        (document.getElementById('fireballDistance').innerHTML = `Distance: ${convertedLat}`)});;

document.getElementById('consoleButton3').addEventListener("click", () => { g.distanceGet()});

console.log(distance(42, 25, 34, 56))

