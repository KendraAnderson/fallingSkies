var o=(d,i,e)=>new Promise((t,l)=>{var a=r=>{try{n(e.next(r))}catch(s){l(s)}},c=r=>{try{n(e.throw(r))}catch(s){l(s)}},n=r=>r.done?t(r.value):Promise.resolve(r.value).then(a,c);n((e=e.apply(d,i)).next())});import f from"./geoAPI.js";export default class m{fireballMap(i,e){return o(this,null,function*(){const t="%2C";let l=`
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/search?q=${i}${t}${e}&key=AIzaSyDUcCBfta5KPWLm3OxTK2Xv9Vv5ufEjc2c" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;return l})}fireballCard(){return o(this,null,function*(){let i=document.getElementById("fireballCont"),e=localStorage.getItem("closestFBs"),t=localStorage.getItem("userLatLon"),l=0;e=e.split(","),t=t.split(", "),t=t.join(","),i.innerHTML="";for(let a=0;a<e.length;a=a+2){const c=new f;let n=yield c.distanceGet(t,`${e[a]},${e[a+1]}`);if(n=JSON.stringify(n),e[1]===void 0||e[a+1]===void 0)console.log(`Distance could not be found for Fireball ${a}`);else{let r=yield this.fbMap(e[a],e[a+1]);l=l+1;let s=`
                <div class="fireballLocaleCont">
                    <div class="fireCard">
                        <div class="fbText" id="fbText${a}">
                            <h2>Fireball ${l}</h2>
                            <p id="fireballLat[${a}]">Latitude: ${e[a]}</p>
                            <p id="fireballLong[${a}]">Longitude: ${e[a+1]}</p>
                            <p id="fireballDistance[${a}]">Distance: ${n} km</p>
                        </div>
                        <div class="fbMap" id="fbMap${a}">
                            ${r}
                        </div>
                    </div>  
                </div>
                `;i.innerHTML=i.innerHTML+s}}})}fireballPlaceDOM(){return o(this,null,function*(){let i=["this","that","the other"],e=document.getElementById("fireballCont");for(let t=-1;t<i.length;t++){let l=this.fireballCard(t);e.innerHTML=e.innerHTML+l}})}fbMap(i,e){return o(this,null,function*(){let t=`
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${i}%20${e}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;return t})}}
