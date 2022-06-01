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
export function getFormValues() {
  let formData = [];
  const address = document.forms["userLocation"]["address"].value;
  const city = document.forms["userLocation"]["city"].value;
  const state = document.forms["userLocation"]["state"].value;
  const country = document.forms["userLocation"]["country"].value;
  formData.push(address, city, state, country);
  return formData;
}
export function placeMap() {
  return __async(this, null, function* () {
    const form = JSON.parse(localStorage.getItem("userLocation"));
    let addressArray = form.ul0.split(" ");
    addressArray = addressArray.join("+");
    let cityArray = form.ul1.split(" ");
    cityArray = cityArray.join("+");
    let state = form.ul2;
    let countryArray = form.ul3.split(" ");
    countryArray = countryArray.join("+");
    let map = `
    
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYSN0Vk3gdgRM8mtiaOH7c7eXKsXRjyKk&q=${addressArray},${cityArray}+${state}+${countryArray}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>
    
              `;
    return map;
  });
}
export function placeDOM() {
  return __async(this, null, function* () {
    const userHead = document.getElementById("userHead");
    const userAddPath = document.getElementById("userAddress");
    const userCityPath = document.getElementById("userCity");
    const userStatePath = document.getElementById("userState");
    const userCountryPath = document.getElementById("userCountry");
    const userMap = document.getElementById("userMap");
    const formData = yield getFormValues();
    const mapData = yield placeMap();
    userHead.textContent = "Your Location";
    userAddPath.innerHTML = "Address: " + formData[0];
    userCityPath.innerHTML = "City: " + formData[1];
    userStatePath.innerHTML = "State: " + formData[2];
    userCountryPath.innerHTML = "Country: " + formData[3];
    userMap.innerHTML = mapData;
  });
}
