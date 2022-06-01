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
const eventUrl = "https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=";
const key = "KFPsJ58iSGGzrFPIlYncQiDxUMsChaZ1osGtSUj3";
export default class Notices {
  constructor() {
    this.notice = {};
  }
  init() {
    return __async(this, null, function* () {
      this.notice = yield this.getNotices();
      this.displayNotice();
    });
  }
  getNotices() {
    return __async(this, null, function* () {
      return yield fetch(`${eventUrl}${key}`).then((response) => convertToJson(response)).then((data) => data.events[0]).catch((error) => console.log(error));
    });
  }
  displayNotice() {
    let noticeTitle = document.getElementById("noticeTitle");
    noticeTitle.innerHTML = this.notice.title;
    let noticeDate = document.getElementById("noticeDate");
    let jsonDate = this.notice.geometries[this.notice.geometries.length - 1].date;
    const longDate = new Date(jsonDate);
    let date = longDate.toDateString();
    noticeDate.innerHTML = date;
    let noticeLink = document.getElementById("noticeLink");
    noticeLink.innerHTML = "Click Here";
    noticeLink.setAttribute("href", this.notice.sources[0].url);
  }
}
