import ConnectToNasa from './connectToNasa.js';
import { getFormValues } from './formPull.js';

let cToN = new ConnectToNasa;

export default class GeoApi {
    
    
    async init() {
    //Positionstack.com
    //Global variables
    this.forwardGeo = 'http://api.positionstack.com/v1/forward?access_key=';
    this.reverseGeo = 'http://api.positionstack.com/v1/reverse?access_key='; 
    this.positionstackKey = '0f450b6879124d364586219d30b6bb14';
    this.query = '&query=';
    this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
    this.origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
    this.destination = '1904 152 ave, Edmonton T5Y 2R7, AB, Canada'
    //Distance Matrix AI (distancematrix.ai)
    //Global variables
    this.dmtoken = "QBxCMLC6DVxM9Lkc0uYokC8ZbxU9P";
    this.origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
    this.destination = '1904 152 ave, Edmonton T5Y 2R7, AB, Canada';
    this.fireballs = await cToN.getData();
    }

    async forwardPGet() {
        //For address input use forwardPGet
        const link = this.forwardGeo + this.positionstackKey + this.query + '7509 S 2840 W, West Jordan, UT';
        //console.log(link);
        await fetch(link)
        .then(response => response.json())
        .then(forwardResponse => console.table(forwardResponse));

    }

    async reversePGet(lat, long) {
        let reverseAddress = [];
        //lat = 40.614469
        //long = -111.961312
        const link = this.reverseGeo + this.positionstackKey + this.query + `${lat},${long}`;
        //console.log(link);
        await fetch(link)
        .then(async response => response.json())
        //.then(reverseResponse => console.table(reverseResponse))
        .then( function (response) {
            let dataParse = response.data[0].label;
            //console.table(`Table Hunter: ${response.data}`);
            console.table(`Label hunter: ${dataParse}`);
            return dataParse;
        })
        
    };

    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async distanceGet(origin, destination) {
        //origin = "7509 S 2840 W, West Jordan, UT 84084, USA";
        //destination = '40.614469,-111.961312';
        const link = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=<${origin}>&destinations=<${destination}>&key=${this.dmtoken}`
        //console.log(link);
        return await fetch(link)
        .then(response => response.json())
        //.then(destinationResponse => console.table(destinationResponse));
        

    }

    //////////////////////////////////////////////////////////////////////////////
    async getTheDistance() {
        // closestLat = 0;
        // iValue = '';
        // closestLon = 0;

        let origin = getFormValues()
        let destination = this.fireballs; //"40.609469,-111.951818"; //
        destination = this.reversePGet(destination); 
        console.table(`Origin: ${destination}`);
        let tenClosestFireballs = this.getClosest('-33.876304, -60.573260');
        console.log(tenClosestFireballs)
        console.log(this.fireballs)

        
        this.distanceGet(origin, destination);
        
        let distance = await this.distanceGet(origin, destination);
        console.table(distance);

    }
    getClosest(origin){ 
        let closestDistance = 99999999999999;
        let tenClosestElements = [];
        console.log(origin)
        let originSplit = origin.split(',');
        console.log(this.fireballs)
        let closestElement = ''
        for (let i = 0; i < 5; i++){
        this.fireballs.map((element)=>{
            if (tenClosestElements.includes(element)){
                return false;
            }
            else{
            let fireballSplit = element.split(',');
            let lattitudeAdded = parseFloat(fireballSplit[0])-parseFloat(originSplit[0]);//let lonAndLatAdded = parseFloat(lonAndLat[0])+parseFloat(lonAndLat[1]);
            let longitudeAdded = parseFloat(fireballSplit[1])-parseFloat(originSplit[1]);
            
            if (lattitudeAdded<0){
                lattitudeAdded = lattitudeAdded*-1
            }
            if (longitudeAdded<0){
                longitudeAdded = longitudeAdded*-1
            }
            let distance = lattitudeAdded + longitudeAdded;

            if (distance<closestDistance){
                closestDistance = distance;
                closestElement = element;
                console.log(`${element}  :  ${lattitudeAdded}`)
            }
        }
        });
        closestDistance = 99999999999999;   
        tenClosestElements.push(closestElement);
    }
    return tenClosestElements;
    }
};



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //MAP EMBED BUILDER
//     place_map() {
//         const location = document.getElementById("map");
//         const address = '';
//         let link = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-grey&width=600&height=400&center=lonlat:-122.670651,45.522488&zoom=14.8713&marker=lonlat:-122.67648120519785,45.52446015500584;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:1;whitecircle:no|lonlat:-122.67129648458975,45.52309591904512;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:2;whitecircle:no|lonlat:-122.66444608451033,45.522964424673916;type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:3;whitecircle:no&apiKey=795ee7756c6b479c9568e38392bac279`

        
//         location.innerHTML = ``;




//     }

//     place_map();


// };



    // export default class pStackGeo {
        
    //     constructor() {
    //         this.forwardGeo = 'http://api.positionstack.com/v1/forward?access_key=';
    //         this.reverseGeo = 'http://api.positionstack.com/v1/reverse?access_key='; 
    //         this.positionstackKey = '0f450b6879124d364586219d30b6bb14';
    //         this.query = '&query=';
    //     }


    //     async forwardPGet() {
    //         //For address input use forwardPGet
    //         const link = forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT';
    //         console.log(link);
    //         fetch(forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT')
    //         .then(response => response.json())
    //         .then(forwardResponse => console.table(forwardResponse));
    //     }
        
    // }


    // const stacked = new pStackGeo;
    // stacked.forwardPGet();










