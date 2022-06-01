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
export function convertToJson(res) {
  return __async(this, null, function* () {
    let jsonResponse = yield res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw {name: "servicesError", message: jsonResponse};
    }
  });
}
export function renderWithTemplate(template, parentElement, data, callback) {
  return __async(this, null, function* () {
    yield template;
    let clone = template.content.cloneNode(true);
    if (callback) {
      clone = callback(clone, data);
    }
    parentElement.appendChild(clone);
  });
}
export function loadTemplate(path) {
  return __async(this, null, function* () {
    const templateData = yield fetch(path).then((response) => response.text());
    let newTemplate = document.createElement("template");
    newTemplate.innerHTML = templateData;
    return newTemplate;
  });
}
export function loadHeaderFooter(header, footer) {
  return __async(this, null, function* () {
    let headerTemplate = yield loadTemplate("/partials/header.html");
    let footerTemplate = yield loadTemplate("/partials/footer.html");
    let headerElement = document.querySelector(header);
    let footerElement = document.querySelector(footer);
    yield renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
    let nav = document.querySelector("nav");
    let button = document.querySelector("#navBtn");
    button.addEventListener("click", () => {
      displayNav(nav, button);
    });
  });
}
export function distance(latOr, latDest, lonOr, lonDest) {
  return __async(this, null, function* () {
    lonOr = (yield lonOr) * Math.PI / 180;
    lonDest = lonDest * Math.PI / 180;
    latOr = latOr * Math.PI / 180;
    latDest = latDest * Math.PI / 180;
    let lonDiff = lonDest - lonOr;
    let latDiff = latDest - latOr;
    let a = Math.pow(Math.sin(latDiff / 2), 2) + Math.cos(latOr) * Math.cos(latDest) * Math.pow(Math.sin(lonDiff / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return c * r;
  });
}
function displayNav(nav, btn) {
  if (nav.style.display === "none") {
    nav.style.display = "block";
    btn.style.boxShadow = "1px 1px 5px white";
  } else {
    nav.style.display = "none";
    btn.style.boxShadow = "none";
  }
}
