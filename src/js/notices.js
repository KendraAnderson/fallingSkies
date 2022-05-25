import { convertToJson } from "./utils";
const eventUrl = "https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=";
const key = "KFPsJ58iSGGzrFPIlYncQiDxUMsChaZ1osGtSUj3";

export default class Notices {
    constructor() {
        this.notice = {};
    }
    
    async init() {
        this.notice = await this.getNotices();
      }
    
    async getNotices() {

        //let noticeArea = document.getElementById("notices");

        return await fetch(`${eventUrl}${key}`)
            .then(response => convertToJson(response))
            .then(data => data.events[0])
            .catch(error => console.log(error));
    }

    displayNotice() {
        let noticeTitle = document.getElementById("noticeTitle");
        noticeTitle.innerHTML = this.notice.title;

        let noticeDate = document.getElementById("noticeDate");

        let jsonDate = this.notice.geometries[notice.geometries.length - 1].date;
        const longDate = new Date(jsonDate);
        let date = longDate.toDateString();
        noticeDate.innerHTML = date;

        let noticeLink = document.getElementById("noticeLink");
        noticeLink.innerHTML = "Click Here";
        noticeLink.setAttribute('href', this.notice.sources[0].url);
    }
}