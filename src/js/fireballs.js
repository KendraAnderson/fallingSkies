import GeoApi from './geoAPI.js';

export default class Fireballs {
    
    async fireballMap(lat, long) {
        const comma = '%2C';
        
        let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/search?q=${lat}${comma}${long}&key=AIzaSyDUcCBfta5KPWLm3OxTK2Xv9Vv5ufEjc2c" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
        //document.getElementById('mapouter').innerHTML = map;
        return map;

    }
    
    async fireballCard(i) {
        let cardDoc = document.getElementById("fireballCont");

        //let fbs = JSON.stringify(localStorage.getItem('closestFBs'));
        let fbs = localStorage.getItem('closestFBs');
        let og = localStorage.getItem('userLatLon');
        
        fbs = fbs.split(",");
        og = og.split(", ");
        og = og.join(",");
        console.table(og);
        //console.table(fbs);
        for (let i = 0; i < fbs.length; i++) {
            const g = new GeoApi();
            
            let distance = await g.distanceGet(og, `${fbs[i]},${fbs[i+1]}`);
            distance = JSON.stringify(distance);
            if (fbs[1] === undefined || fbs[i+1] === undefined) {
                console.log(`Distance could not be found for Fireball ${i}`)
            } else {
                let map = await this.fbMap(fbs[i], fbs[i+1]);

                let card = `
                <div class="fireballLocaleCont">
                    <div class="fireCard">
                        <h2>Closest Fireball</h2>
                        <p id="fireballLat[${i}]">Latitude: ${fbs[i]}</p>
                        <p id="fireballLong[${i}]">Longitude: ${fbs[i+1]}</p>
                        <p id="fireballDistance[${i}]">Distance: ${distance} km</p>
                        <div class="fbMap[${i}]">
                            ${map}
                        </div>
                    </div>  
                </div>
                `;
                cardDoc.innerHTML = cardDoc.innerHTML + card;
            }
            }


        //return card;
    }

    async fireballPlaceDOM() {
        let thisArray = ["this", "that", "the other"];
        let fireHTML = document.getElementById("fireballCont");

        for (let i = -1; i < thisArray.length; i++) {
            let card = this.fireballCard(i);
            console.log(`Card: ${card}`);
            fireHTML.innerHTML = fireHTML.innerHTML + card;
        };



    }

    async fbMap(lat, long) {
        let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${lat}%20${long}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `

        return map;


    }
}