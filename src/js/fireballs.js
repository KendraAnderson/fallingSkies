

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
        // get information
        //const closest
        let card = `
        <div class="fireballLocaleCont">
            <div class="fireCard">
                <h2>Closest Fireball</h2>
                <p id="fireballLat[${i}]">Latitude: ${i}</p>
                <p id="fireballLong[${i}]">Longitude: ${i}</p>
                <p id="fireballDistance[${i}]">Distance: ${i}</p>
                <div class="fbMap[${i}]">
                
                </div>
            </div>  
        </div>
        `;
        return card;
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





}