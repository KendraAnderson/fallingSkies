var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (result) => {
      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import ConnectToNasa from "./connectToNasa.js";
import {localStore} from "./localStorage.js";
import {getStore} from "./localStorage.js";
import Fireballs from "./fireballs.js";
let cToN = new ConnectToNasa();
export default class GeoApi {
  init() {
    return __async(this, null, function* () {
      this.forwardGeo = "http://api.positionstack.com/v1/forward?access_key=";
      this.reverseGeo = "http://api.positionstack.com/v1/reverse?access_key=";
      this.positionstackKey = "0f450b6879124d364586219d30b6bb14";
      this.query = "&query=";
      this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
      this.gToken = "AIzaSyCmaff4C42bJbYWUp74S_yc4oWWwOkwZog";
      this.origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
      this.destination = "1904 152 ave, Edmonton T5Y 2R7, AB, Canada";
      this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
      this.origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
      this.destination = "1904 152 ave, Edmonton T5Y 2R7, AB, Canada";
      this.fireballs = yield cToN.getData();
      this.tenClosestFireballs = [];
      this.fbLatLongStore = "FBallStore";
      this.userAddressStore = "userLocation";
      this.userLatLonStore = "userLatLon";
      this.closestFBStore = "closestFBs";
    });
  }
  forwardPGet(keyName, address, city, state, country) {
    return __async(this, null, function* () {
      const link = this.forwardGeo + this.positionstackKey + this.query + `${address},${city} ${state},${country}`;
      yield fetch(link).then(function(response) {
        return response.json();
      }).then(function(jsonObject) {
        const userInfo = jsonObject["data"];
        localStorage.setItem(keyName, `${userInfo[0].latitude}, ${userInfo[0].longitude}`);
      });
    });
  }
  reversePGet(lat, long) {
    return __async(this, null, function* () {
      const link = this.reverseGeo + this.positionstackKey + this.query + `${lat},${long}`;
      yield fetch(link).then((response) => __async(this, null, function* () {
        return response.json();
      })).then(function(response) {
        let dataParse = response.data[0].label;
        return dataParse;
      });
    });
  }
  distanceGet(origin, destination) {
    return __async(this, null, function* () {
      origin = origin.split(",");
      destination = destination.split(",");
      function roundUp(num, precision) {
        precision = Math.pow(10, precision);
        return Math.ceil(num * precision) / precision;
      }
      let lat1 = origin[0];
      let lon1 = origin[1];
      let lat2 = destination[0];
      let lon2 = destination[1];
      let cos = Math.cos;
      let asin = Math.asin;
      let sqrt = Math.sqrt;
      let r = 6371;
      let p = 0.017453292519943295;
      let a = 0.5 - cos((lat2 - lat1) * p) / 2 + cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2;
      let d = 2 * r * asin(sqrt(a));
      d = roundUp(d, 0);
      return d;
    });
  }
  getTheDistance() {
    return __async(this, null, function* () {
      let getOrigin = getStore(this.userAddressStore);
      let origin = JSON.parse(getOrigin);
      yield this.forwardPGet(this.userLatLonStore, origin.ul0, origin.ul1, origin.ul2, origin.ul3);
      origin = JSON.stringify(origin);
      let destination = this.fireballs;
      if (localStorage.getItem(this.fbLatLongStore)) {
        destination = localStorage.getItem(this.fbLatLongStore);
      } else {
        for (let i = 0; i < destination.length; i++) {
          let lat_long = destination[i].split(",");
          localStore(this.fbLatLongStore, `fb${i}`, [lat_long[0], lat_long[1]]);
        }
      }
      let userLatLon = localStorage.getItem(this.userLatLonStore);
      let userLatLonSplit = userLatLon.split(",");
      let userLat = userLatLonSplit[0];
      let userLon = userLatLonSplit[1];
      this.tenClosestFireballs = this.getClosest(`${userLat}, ${userLon}'`);
      localStorage.setItem(this.closestFBStore, this.tenClosestFireballs);
      let f = new Fireballs();
      f.fireballCard();
    });
  }
  getClosest(origin) {
    let closestDistance = 99999999999999;
    let tenClosestElements = [];
    let originSplit = origin.split(",");
    let closestElement = "";
    for (let i = 0; i < 4; i++) {
      this.fireballs.map((element) => {
        if (tenClosestElements.includes(element)) {
          return false;
        } else {
          let fireballSplit = element.split(",");
          let lattitudeAdded = parseFloat(fireballSplit[0]) - parseFloat(originSplit[0]);
          let longitudeAdded = parseFloat(fireballSplit[1]) - parseFloat(originSplit[1]);
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
          }
        }
      });
      closestDistance = 99999999999999;
      tenClosestElements.push(closestElement);
    }
    return tenClosestElements;
  }
}
