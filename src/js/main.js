import { loadHeaderFooter } from "./utils.js";
import { convertToJson } from "./utils.js";
import GeoApi from "./geoAPI.js";
import {placeDOM} from './formPull';
import {placeMap} from './formPull';
import { distance } from "./utils.js"


//Call displayHeaderFooter
loadHeaderFooter("header", "footer")
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

