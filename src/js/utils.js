export async function convertToJson(res) {
    let jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  }

  export async function renderWithTemplate(
    template,
    parentElement,
    data,
    callback
  ) {
    await template;
    let clone = template.content.cloneNode(true);
    if (callback) {
      clone = callback(clone, data);
    }
    parentElement.appendChild(clone);
  }

  export async function loadTemplate(path) {
    const templateData = await fetch(path).then((response) => response.text());
    let newTemplate = document.createElement("template");
    newTemplate.innerHTML = templateData;
    return newTemplate;
  }

  export async function loadHeaderFooter(header, footer) {
    let headerTemplate = await loadTemplate("/partials/header.html");
    let footerTemplate = await loadTemplate("/partials/footer.html");
    let headerElement = document.querySelector(header);
    let footerElement = document.querySelector(footer);
    await renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
    let nav = document.querySelector('nav');
    let button = document.querySelector('#navBtn');
    button.addEventListener('click',()=>{displayNav(nav,button)});
  }
export async function distance( 
  latOr, latDest, lonOr, lonDest)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lonOr = await lonOr * Math.PI / 180;
lonDest = lonDest * Math.PI / 180;
latOr = latOr * Math.PI / 180;
latDest = latDest * Math.PI / 180;

// Haversine formula
let lonDiff = lonDest - lonOr;
let latDiff = latDest - latOr;
let a =  Math.pow(Math.sin(latDiff / 2), 2)
+ Math.cos(latOr) * Math.cos(latDest)
* Math.pow(Math.sin(lonDiff / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
return(c * r);
}
function displayNav(nav,btn){
  if (nav.style.display==="none"){
  nav.style.display="block";
  btn.style.boxShadow="1px 1px 5px white";
  } else{
    nav.style.display="none";
    btn.style.boxShadow="none";
  }
}

