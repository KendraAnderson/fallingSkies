//Positionstack.com
//Global variables
const forwardGeo = 'http://api.positionstack.com/v1/forward?access_key=';
const reverseGeo = 'http://api.positionstack.com/v1/reverse?access_key='; 
const positionstackKey = '0f450b6879124d364586219d30b6bb14';
const query = '&query=';



function forwardPGet() {
    //For address input use forwardPGet
    const link = forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT';
    //console.log(link);
    fetch(link)
    .then(response => response.json())
    .then(forwardResponse => console.table(forwardResponse));

}

//index.html button trigger
document.getElementById('consoleButton').addEventListener("click", () => { forwardPGet()});


function reversePGet(lat, long) {
    lat = 40.614469
    long = -111.961312
    const link = reverseGeo + positionstackKey + query + `${lat},${long}`;
    //console.log(link);.
    fetch(link)
    .then(response => response.json())
    .then(reverseResponse => console.table(reverseResponse));

}

document.getElementById('consoleButton2').addEventListener("click", () => { reversePGet()});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Distance Matrix AI (distancematrix.ai)
//Global variables
const dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
const origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
const destination = '1904 152 ave, Edmonton T5Y 2R7, AB, Canada'

function distanceGet(origin, destination) {
    origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
    destination = '53.615557,-113.369965'
    const link = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${dmtoken}`
    console.log(link);
    fetch(link)
    .then(response => response.json())
    .then(destinationResponse => console.table(destinationResponse));
}

document.getElementById('consoleButton3').addEventListener("click", () => { distanceGet()});





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAP EMBED BUILDER
function place_map() {
    const location = document.getElementById("map");
    const address = '';
    let link = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-grey&width=600&height=400&center=lonlat:-122.670651,45.522488&zoom=14.8713&marker=lonlat:-122.67648120519785,45.52446015500584;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:1;whitecircle:no|lonlat:-122.67129648458975,45.52309591904512;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:2;whitecircle:no|lonlat:-122.66444608451033,45.522964424673916;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:3;whitecircle:no&apiKey=795ee7756c6b479c9568e38392bac279`

    
    location.innerHTML = ``;




}

place_map();






// export default class pStackGeo {
    
//     constructor() {
//         this.forwardGeo = 'http://api.positionstack.com/v1/forward?access_key=';
//         this.reverseGeo = 'http://api.positionstack.com/v1/reverse?access_key='; 
//         this.positionstackKey = '0f450b6879124d364586219d30b6bb14';
//         this.query = '&query=';
//     }


//     async forwardPGet() {
//         //For address input use forwardPGet
//         const link = forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT';
//         console.log(link);
//         fetch(forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT')
//         .then(response => response.json())
//         .then(forwardResponse => console.table(forwardResponse));
//     }
     
// }


// const stacked = new pStackGeo;
// stacked.forwardPGet();










