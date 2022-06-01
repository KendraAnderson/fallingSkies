import { loadHeaderFooter } from "./utils.js";
import { convertToJson } from "./utils.js";
import GeoApi from "./geoAPI.js";
import {getFormValues, placeDOM} from './formPull';
import {placeMap} from './formPull';
import { distance } from "./utils.js"
import Notices from './notices.js';
import { localStore, getStore } from './localStorage.js';
import Fireballs from './fireballs.js';


//Call displayHeaderFooter
loadHeaderFooter("header", "footer")

//Display the default map
// let defaultMap = `
    
//         <iframe width="100%" height="100%" id="gmap_canvas" 
//         src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=50+N+W+Temple+St,Salt+Lake+City%2C+UT+84150" 
//         frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
//         </iframe>
    
//               `;
    
//     document.getElementById('mapouter').innerHTML = defaultMap;

//Create an instance of notices
const notices = new Notices();
notices.init();

//Call other functions to run program...

// initialize GeoApi
let g = new GeoApi();
g.init();
//let convertedLat = await g.reversePGet('53.615557','-113.369965');






document.getElementById('submitLocation').addEventListener('click', (e) => {
    e.preventDefault();
    let myForm = document.forms[0];   
    let chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {

        const f = new Fireballs();
        ////////////////////////////////// get form values - place them in local storage
        let formGot = getFormValues();
        // Form KEY:VALUE
        // 0 : Address
        // 1 : City
        // 2 : State
        // 3 : Country
        let userStoreName = "userLocation";
        //console.log(formGot);

        // user location localstorage placement 
        for (let i = 0; i < formGot.length; i++) {
            let key = `ul${i}`;
            let value = formGot[i];
            
            localStore(userStoreName, key, value);
        };
        
        
        g.getTheDistance();
         
        //console.log("FormGot");
        //console.log(formGot.length);
        //console.table(formGot[0]);

        placeDOM();
        placeMap();
        f.fireballCard(0);
    }
});



//index.html button trigger
// document.getElementById('consoleButton').addEventListener("click", () => { g.forwardPGet()});
// document.getElementById('consoleButton2').addEventListener("click", () => { 
//         (console.log(`ConvertedLat: ${convertedLat}`));
//         (document.getElementById('fireballDistance').innerHTML = `Distance: ${convertedLat}`)});;

// document.getElementById('consoleButton3').addEventListener("click", () => { g.distanceGet()});

//console.log(distance(42, 25, 34, 56))

