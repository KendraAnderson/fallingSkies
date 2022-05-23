import { convertToJson } from "./utils";
const eventUrl = "https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=";
const key = "KFPsJ58iSGGzrFPIlYncQiDxUMsChaZ1osGtSUj3";

export default class Notices {
    async getNotices() {
        return await fetch (`${eventUrl}${key}`)
        .then(res => convertToJson(res));
    }
}

// async function getNotices() {
//     return await fetch(`${eventUrl}${key}`)
//         .then(response => response.json())
//         .then(data => data.events[0])
//         .catch(error => console.log(error));
// }

 const notice = getNotices();
 console.log(notice);