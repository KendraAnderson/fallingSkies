var c=(e,t,s)=>new Promise((r,l)=>{var i=a=>{try{o(s.next(a))}catch(p){l(p)}},n=a=>{try{o(s.throw(a))}catch(p){l(p)}},o=a=>a.done?r(a.value):Promise.resolve(a.value).then(i,n);o((s=s.apply(e,t)).next())});import{convertToJson as u}from"./utils.js";const f="K2Jb0JsuuypmVqpf8TxkBxcHhrlkHvCWRuC0z1tc",h="https://ssd-api.jpl.nasa.gov/fireball.api";export default class y{getData(){return c(this,null,function*(){return yield fetch(`${h}&api_key=${f}`).then(t=>u(t)).then(t=>this.arrayNasa(t))})}arrayNasa(t){return c(this,null,function*(){let s=[];return t.data.forEach(r=>{let l=r[3],i=r[4],n=r[5],o=r[6];if(l!=null||n!=null){i==="S"&&(l=l*-1),o==="W"&&(n=n*-1);let a=`${l},${n}`;s.push(a)}}),s})}}