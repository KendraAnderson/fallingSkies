import ConnectToNasa from "./connectToNasa.js";
import { localStore } from "./localStore.js";


let connect = new ConnectToNasa
//let fireball = await connect.getData();
//console.table(fireball);


export async function getFormValues() {
    
    // array
    let formData = [];
    // Form value get
    const address = document.forms["userLocation"]["address"].value;
    const city = document.forms["userLocation"]["city"].value;
    const state = document.forms["userLocation"]["state"].value;
    const country = document.forms["userLocation"]["country"].value;
    // array push
    formData.push(address, city, state, country);
    console.table(formData); //testing
    localStore("userLocationArray", "userLocation", JSON.stringify(formData));
    return formData;

    // };
};




export async function placeMap() {
    const form = getFormValues();
    console.table(form);
    let addressArray = form[0].split(" ");
    addressArray = addressArray.join('+');
    
    let cityArray = form[1].split(" ");
    cityArray = cityArray.join('+');

    let state = form[2];

    let countryArray = form[3].split(' ');
    countryArray = countryArray.join('+');


    //console.log(addressArray, cityArray, state, countryArray);
    
    


    let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${addressArray},${cityArray}+${state}+${countryArray}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
// Old placement code
    //document.getElementById('mapouter').innerHTML = map;
// Replaced with Return map variable for placing in DOM
    return map;
}

export async function placeDOM() {
    // paths
    const userHead = document.getElementById('userHead');
    const userAddPath = document.getElementById('userAddress');
    const userCityPath = document.getElementById('userCity');
    const userStatePath = document.getElementById('userState');
    const userCountryPath = document.getElementById('userCountry');
    const userMap = document.getElementById('userMap');

    // get values
    const formData = await getFormValues();
    console.log(` FORM DATA LINE 70 FORMPULL${formData}`);
    const mapData = await placeMap();

    // form DOM placement
    userHead.textContent = "Your Location"; 
    userAddPath.innerHTML = "Address: " + formData[0];
    userCityPath.innerHTML = "City: " + formData[1];
    userStatePath.innerHTML = "State: " + formData[2];
    userCountryPath.innerHTML = "Country: " + formData[3];
    userMap.innerHTML = mapData;
}




// document.getElementById('submitLocation').addEventListener('click', (e) => {
//     e.preventDefault();
//     let myForm = document.forms[0];
//     let chk_status = myForm.checkValidity();
//     myForm.reportValidity();
//     if (chk_status) {

//         placeDOM();
//         placeMap();
//         connect.getData();

// //     }
//   });






//document.getElementById('submitLocation').addEventListener("click" () => {getFormValues});

// export default class FormPull {
//     init() {
//         this.form = document.getElementById('userLocation');
//         formData = [];
//     };

//     getFormValues() {
//         this.form.onclick = function(e) {
//             e.preventDefault();
//         const address = document.getElementById("address").value;
//         const city = document.getElementById("city").value;
//         const country = document.getElementById("country").value;

//         formData.push(address, city, country);
//         console.log(formData);


//         };
//     };



// };

// const form = new FormPull;
// document.getElementById('userLocation').onclick(form.getFormValues());