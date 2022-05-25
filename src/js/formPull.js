import ConnectToNasa from "./connectToNasa.js";
let connect = new ConnectToNasa
//let fireball = await connect.getData();
//console.table(fireball);


export function getFormValues() {
    
    // array
    let formData = [];
    // Form value get
    const address = document.forms["userLocation"]["address"].value;
    const city = document.forms["userLocation"]["city"].value;
    const state = document.forms["userLocation"]["state"].value;
    const country = document.forms["userLocation"]["country"].value;
    // array push
    formData.push(address, city, state, country);
    //console.table(formData); //testing

    return formData;

    // };
};



export async function placeMap() {
    const form = getFormValues();

    let addressArray = form[0].split(" ");
    addressArray = addressArray.join('+');
    
    let cityArray = form[1].split(" ");
    cityArray = cityArray.join('+');

    let state = form[2];

    let countryArray = form[3].split(' ');
    countryArray = countryArray.join('+');


    console.log(addressArray, cityArray, state, countryArray);
    
    


    let map = `
    
        <iframe width="800" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${addressArray},${cityArray}+${state}+${countryArray}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
        <br></br>
    
              `;
    
    document.getElementById('mapouter').innerHTML = map;
}

export function placeDOM() {
    // paths
    const userHead = document.getElementById('userHead');
    const userAddPath = document.getElementById('userAddress');
    const userCityPath = document.getElementById('userCity');
    const userStatePath = document.getElementById('userState');
    const userCountryPath = document.getElementById('userCountry');
    // get form values
    const formData = getFormValues();

    // form DOM placement
    userHead.textContent = "Your Location"; 
    userAddPath.innerHTML = "Address: " + formData[0];
    userCityPath.innerHTML = "City: " + formData[1];
    userStatePath.innerHTML = "State: " + formData[2];
    userCountryPath.innerHTML = "Country: " + formData[3];
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