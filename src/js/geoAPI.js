//Global variables
 //Positionstack.com
 const forwardGeo = 'http://api.positionstack.com/v1/forward?access_key=';
 const reverseGeo = 'http://api.positionstack.com/v1/reverse?access_key='; 
 const positionstackKey = '0f450b6879124d364586219d30b6bb14';
 const query = '&query=';


function forwardPGet() {
    //For address input use forwardPGet
    const link = forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT';
    console.log(link);
    fetch(forwardGeo + positionstackKey + query + '7509 S 2840 W, West Jordan, UT')
    .then(response => response.json())
    .then(forwardResponse => console.table(forwardResponse));
}

//const stacked = new pStackGeo;
document.getElementById('consoleButton').addEventListener("click", () => { forwardPGet()});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




















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










