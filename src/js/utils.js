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
    let headerTemplate = await loadTemplate("./partials/header.html");
    let footerTemplate = await loadTemplate("./partials/header.html");
    let headerElement = document.querySelector(header);
    let footerElement = document.querySelector(footer);
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  }