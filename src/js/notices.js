//import { convertToJson } from "./utils";
const eventUrl = "https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=";
const key = "KFPsJ58iSGGzrFPIlYncQiDxUMsChaZ1osGtSUj3";

// export default class Notices {
//     async getNotices() {
//         return await fetch (`${eventUrl}${key}`)
//         .then(res => convertToJson(res))
//         .then(result =>);
//     }
// }

async function getNotices() {
    return await fetch(`${eventUrl}${key}`)
        .then(response => response.json())
        .then(data => data.events[0])
        .catch(error => console.log(error));
}

//testing
//const thing = new Notices();
const notice = getNotices();
console.log(notice);