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

    let noticeArea = document.getElementById("notices");

    return await fetch(`${eventUrl}${key}`)
        .then(response => response.json())
        .then(data => data.events[0])
        //.then(res => noticeArea.innerHTML = res.geometries[res.geometries.length-1].date)
        .catch(error => console.log(error));
}

const notice = await getNotices();
console.log(notice);

let noticeTitle = document.getElementById("noticeTitle");
noticeTitle.innerHTML = notice.title;

let noticeDate = document.getElementById("noticeDate");

let jsonDate = notice.geometries[notice.geometries.length-1].date;
const longDate = new Date(jsonDate);
let date = longDate.toDateString();
noticeDate.innerHTML = date;

let noticeLink = document.getElementById("noticeLink");
noticeLink.innerHTML = "Click Here";
noticeLink.setAttribute('href', notice.sources[0].url);