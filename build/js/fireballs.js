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
import GeoApi from "./geoAPI.js";
export default class Fireballs {
  fireballMap(lat, long) {
    return __async(this, null, function* () {
      const comma = "%2C";
      let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/search?q=${lat}${comma}${long}&key=AIzaSyDUcCBfta5KPWLm3OxTK2Xv9Vv5ufEjc2c" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
      return map;
    });
  }
  fireballCard() {
    return __async(this, null, function* () {
      let cardDoc = document.getElementById("fireballCont");
      let fbs = localStorage.getItem("closestFBs");
      let og = localStorage.getItem("userLatLon");
      let count = 0;
      fbs = fbs.split(",");
      og = og.split(", ");
      og = og.join(",");
      cardDoc.innerHTML = "";
      for (let i = 0; i < fbs.length; i = i + 2) {
        const g = new GeoApi();
        let distance = yield g.distanceGet(og, `${fbs[i]},${fbs[i + 1]}`);
        distance = JSON.stringify(distance);
        if (fbs[1] === void 0 || fbs[i + 1] === void 0) {
          console.log(`Distance could not be found for Fireball ${i}`);
        } else {
          let map = yield this.fbMap(fbs[i], fbs[i + 1]);
          count = count + 1;
          let card = `
                <div class="fireballLocaleCont">
                    <div class="fireCard">
                        <div class="fbText" id="fbText${i}">
                            <h2>Fireball ${count}</h2>
                            <p id="fireballLat[${i}]">Latitude: ${fbs[i]}</p>
                            <p id="fireballLong[${i}]">Longitude: ${fbs[i + 1]}</p>
                            <p id="fireballDistance[${i}]">Distance: ${distance} km</p>
                        </div>
                        <div class="fbMap" id="fbMap${i}">
                            ${map}
                        </div>
                    </div>  
                </div>
                `;
          cardDoc.innerHTML = cardDoc.innerHTML + card;
        }
      }
    });
  }
  fireballPlaceDOM() {
    return __async(this, null, function* () {
      let thisArray = ["this", "that", "the other"];
      let fireHTML = document.getElementById("fireballCont");
      for (let i = -1; i < thisArray.length; i++) {
        let card = this.fireballCard(i);
        fireHTML.innerHTML = fireHTML.innerHTML + card;
      }
    });
  }
  fbMap(lat, long) {
    return __async(this, null, function* () {
      let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${lat}%20${long}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
      return map;
    });
  }
}
