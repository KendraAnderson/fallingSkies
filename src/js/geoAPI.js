import ConnectToNasa from "./connectToNasa.js";
import { localStore } from "./localStorage.js";
import { getStore } from "./localStorage.js";
import Fireballs from "./fireballs.js";

let cToN = new ConnectToNasa();

export default class GeoApi {
  async init() {
    //Positionstack.com
    //Global variables
    this.forwardGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    this.geoToken = "&key=AIzaSyDWZ8bRVoSbiczpfVBivWnvNmH4T-B9n7I";
    this.reverseGeo = "http://api.positionstack.com/v1/reverse?access_key=";
    this.positionstackKey = "0f450b6879124d364586219d30b6bb14";
    this.query = "&query=";
    this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
    this.gToken = "AIzaSyCmaff4C42bJbYWUp74S_yc4oWWwOkwZog";
    //Distance Matrix AI (distancematrix.ai)
    //Global variables
    this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
    this.fireballs = await cToN.getData();
    this.tenClosestFireballs = [];
    //this.fireballs = JSON.stringify(this.fireballs);
    //LOCAL STORAGE KEYS
    this.fbLatLongStore = "FBallStore";
    this.userAddressStore = "userLocation";
    this.userLatLonStore = "userLatLon";
    this.closestFBStore = "closestFBs";
    console.log(this.forwardGeo)
  }

  async forwardPGet(keyName, address, city, state, country) {
    //For address input use forwardPGet
    // handle spaces in each
    let splitAdd = address.split(' ');
    let splitCity = city.split(' ');
    let splitState = state.split(' ');
    let splitCountry = country.split(' ');

    let joinedAdd = splitAdd.join('+');
    let joinedCity = splitCity.join('+');
    let joinedState = splitState.join('+');
    let joinedCountry = splitCountry.join('+');


    let addressArray = [joinedAdd, joinedCity, joinedState, joinedCountry];
    let query = addressArray.join(',');
    //console.log(query);
    const link =
      this.forwardGeo +
      query +
      this.geoToken;
    //console.log(`LINK fpg: ${link}`);
    //let latLon =

    await fetch(link)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        //console.table(jsonObject);
        const userInfo = jsonObject['results'];
        let pep = this.forwardGeo;
        //console.table(userInfo);
        //console.table(userInfo[0].geometry.location.lat);
        console.log(`forwardGeo ${pep}`);
        console.log(`query ${query}`);
        console.log(`geoToken ${geoToken}`);
        console.log(`Link ${link}`);
        console.log(`User info ${userInfo}`);
        console.log(userInfo[0]);
        localStorage.setItem(
          keyName,
          `${userInfo[0].geometry.location.lat}, ${userInfo[0].geometry.location.lng}`
        );
        
      });
    //.then(forwardResponse => console.table(forwardResponse));
  }

  async reversePGet(lat, long) {
    //lat = 40.614469
    //long = -111.961312
    const link =
      this.reverseGeo + this.positionstackKey + this.query + `${lat},${long}`;
    //console.log(link);
    await fetch(link)
      .then(async (response) => response.json())
      //.then(reverseResponse => console.table(reverseResponse))
      .then(function (response) {
        let dataParse = response.data[0].label;
        //console.table(`Table Hunter: ${response.data}`);
        //console.table(`Label hunter: ${dataParse}`);
        return dataParse;
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async distanceGet(origin, destination) {
    origin = origin.split(",");

    destination = destination.split(",");

    //console.table(origin, destination);

    function roundUp(num, precision) {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
    }
    let lat1 = origin[0]; //latitude value of point A>;
    let lon1 = origin[1]; //<longitude value of point A>;
    let lat2 = destination[0]; //<latitude value of point B>;
    let lon2 = destination[1]; //<longitude value of point B>;
    let cos = Math.cos;
    let asin = Math.asin;
    let sqrt = Math.sqrt;

    let r = 6371; //#radius of Earth (KM)
    let p = 0.017453292519943295; //#Pi/180
    let a =
      0.5 -
      cos((lat2 - lat1) * p) / 2 +
      (cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p))) / 2;

    let d = 2 * r * asin(sqrt(a)); //#2*R*asin
    //console.log(`Distance GOT: ${d}`);
    d = roundUp(d, 0);
    return d;
    //.then(destinationResponse => console.table(destinationResponse));
  }

  //////////////////////////////////////////////////////////////////////////////
  async getTheDistance() {
    // closestLat = 0;
    // iValue = '';
    // closestLon = 0;
    let getOrigin = getStore(this.userAddressStore);
    //console.table(`LINE 86: ${getOrigin}`);
    let origin = JSON.parse(getOrigin);
    //console.table(origin.ul0);
    //let originLatLon =
    await this.forwardPGet(
      this.userLatLonStore,
      origin.ul0,
      origin.ul1,
      origin.ul2,
      origin.ul3
    );
    //originLatLon = JSON.stringify(originLatLon);
    //console.log(originLatLon);

    origin = JSON.stringify(origin);
    let destination = this.fireballs; //"40.609469,-111.951818"; //

    if (localStorage.getItem(this.fbLatLongStore)) {
      destination = localStorage.getItem(this.fbLatLongStore);
    } else {
      for (let i = 0; i < destination.length; i++) {
        //if (destination[i] != null)
        //console.table(`Origin: ${destination[i]}`);
        let lat_long = destination[i].split(",");
        //console.table(`${i}: LAT_LONG: ${lat_long}`);

        //destination = this.reversePGet(destination[i]);
        //distanceArray.push(await this.reversePGet(lat_long[0], lat_long[1]));
        localStore(this.fbLatLongStore, `fb${i}`, [lat_long[0], lat_long[1]]);
      }
    }
    //console.table(`LINE 101: ${origin}`);
    let userLatLon = localStorage.getItem(this.userLatLonStore);
    let userLatLonSplit = userLatLon.split(",");
    let userLat = userLatLonSplit[0];
    let userLon = userLatLonSplit[1];

    //console.log(`USERLATLONSTORE 126: ${userLatLonSplit[0]}`);
    this.tenClosestFireballs = this.getClosest(`${userLat}, ${userLon}'`); //OG this.getClosest('-33.876304, -60.573260');
    localStorage.setItem(this.closestFBStore, this.tenClosestFireballs);
    //console.log("Just set the closest FB in getTheDistance");

    let f = new Fireballs();
    f.fireballCard();
    //console.log("Ran past the fireball Card");
    //console.table(this.tenClosestFireballs);
    //console.log(this.fireballs);

    //OG this.distanceGet(origin, destination);
    //this.distanceGet(origin, distanceArray);

    //OG let distance = await this.distanceGet(origin, destination);
    //let distance = await this.distanceGet(origin, distanceArray);
    //distance = JSON.stringify(distance);
    //console.table(`DISTANCE LINE 111: ${distance}`);
  }
  getClosest(origin) {
    let closestDistance = 99999999999999;
    let tenClosestElements = [];
    //console.log(`ORIGIN LINE 117: ${origin}`);
    let originSplit = origin.split(",");
    //console.log(`ORIGIN LINE 119: ${this.fireballs}`);
    let closestElement = "";
    for (let i = 0; i < 4; i++) {
      this.fireballs.map((element) => {
        if (tenClosestElements.includes(element)) {
          return false;
        } else {
          let fireballSplit = element.split(",");
          let lattitudeAdded =
            parseFloat(fireballSplit[0]) - parseFloat(originSplit[0]); //let lonAndLatAdded = parseFloat(lonAndLat[0])+parseFloat(lonAndLat[1]);
          let longitudeAdded =
            parseFloat(fireballSplit[1]) - parseFloat(originSplit[1]);

          if (lattitudeAdded < 0) {
            lattitudeAdded = lattitudeAdded * -1;
          }
          if (longitudeAdded < 0) {
            longitudeAdded = longitudeAdded * -1;
          }
          let distance = lattitudeAdded + longitudeAdded;

          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = element;
            //console.log(`${element}  :  ${lattitudeAdded}`)
          }
        }
      });
      closestDistance = 99999999999999;
      tenClosestElements.push(closestElement);
    }
    return tenClosestElements;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAP EMBED BUILDER
//     place_map() {
//         const location = document.getElementById("map");
//         const address = '';
//         let link = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-grey&width=600&height=400&center=lonlat:-122.670651,45.522488&zoom=14.8713&marker=lonlat:-122.67648120519785,45.52446015500584;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:1;whitecircle:no|lonlat:-122.67129648458975,45.52309591904512;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:2;whitecircle:no|lonlat:-122.66444608451033,45.522964424673916;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:3;whitecircle:no&apiKey=795ee7756c6b479c9568e38392bac279`

//         location.innerHTML = ``;

//     }

//     place_map();

// };

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
