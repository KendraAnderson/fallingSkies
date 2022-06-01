//Connect to nasa's API
import { convertToJson } from "./utils";
const api_key = "K2Jb0JsuuypmVqpf8TxkBxcHhrlkHvCWRuC0z1tc";
const apiURL = "https://ssd-api.jpl.nasa.gov/fireball.api";

export default class ConnectToNasa {
  async getData() {
    return await fetch(`${apiURL}&api_key=${api_key}`)
      .then((res) => convertToJson(res))
      //.then(printout => console.table(printout))
      .then((response) => this.arrayNasa(response));
  }

  async arrayNasa(response) {
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
      // } else {
      //     console.log(`Nulled`)
      // }
    });
    //console.table(arrayNasa);
    return arrayNasa;
  }
}
