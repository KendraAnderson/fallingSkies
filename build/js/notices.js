var r=(h,t,i)=>new Promise((s,n)=>{var c=e=>{try{a(i.next(e))}catch(l){n(l)}},o=e=>{try{a(i.throw(e))}catch(l){n(l)}},a=e=>e.done?s(e.value):Promise.resolve(e.value).then(c,o);a((i=i.apply(h,t)).next())});import{convertToJson as g}from"./utils.js";const d="https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=",m="KFPsJ58iSGGzrFPIlYncQiDxUMsChaZ1osGtSUj3";export default class u{constructor(){this.notice={}}init(){return r(this,null,function*(){this.notice=yield this.getNotices(),this.displayNotice()})}getNotices(){return r(this,null,function*(){return yield fetch(`${d}${m}`).then(t=>g(t)).then(t=>t.events[0]).catch(t=>console.log(t))})}displayNotice(){let t=document.getElementById("noticeTitle");t.innerHTML=this.notice.title;let i=document.getElementById("noticeDate"),s=this.notice.geometries[this.notice.geometries.length-1].date;const n=new Date(s);let c=n.toDateString();i.innerHTML=c;let o=document.getElementById("noticeLink");o.innerHTML="Click Here",o.setAttribute("href",this.notice.sources[0].url)}}