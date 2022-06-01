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
import {convertToJson} from "./utils.js";
const api_key = "K2Jb0JsuuypmVqpf8TxkBxcHhrlkHvCWRuC0z1tc";
const apiURL = "https://ssd-api.jpl.nasa.gov/fireball.api";
export default class ConnectToNasa {
  getData() {
    return __async(this, null, function* () {
      return yield fetch(`${apiURL}&api_key=${api_key}`).then((res) => convertToJson(res)).then((response) => this.arrayNasa(response));
    });
  }
  arrayNasa(response) {
    return __async(this, null, function* () {
      let arrayNasa = [];
      response.data.forEach((element) => {
        let lat = element[3];
        let latD = element[4];
        let lon = element[5];
        let lonD = element[6];
        if (lat != null || lon != null) {
          if (latD === "S") {
            lat = lat * -1;
          }
          if (lonD === "W") {
            lon = lon * -1;
          }
          let joined = `${lat},${lon}`;
          arrayNasa.push(joined);
        }
      });
      return arrayNasa;
    });
  }
}
