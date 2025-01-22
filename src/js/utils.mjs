// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key)
};

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(productCardTemplate, parentElement, list, position = "afterbegin", clear = false) {
  if (clear == true) {
    while (parentElement.hasChildNodes()) {
      parentElement.removeChild(parentElement.firstChild);
    }
  } else {
    const newList = list;
    parentElement.insertAdjacentHTML(position, newList.map((item) => productCardTemplate(item)).join(""));
  }
}

function renderWithTemplate(template, parentElement, position = "afterbegin", clear = false) {
  const newTemplate = template.content.cloneNode(true);
  parentElement.appendChild(newTemplate);
}

export async function loadHeaderFooter () {
  const header = document.querySelector('#main-header');
  const footer = document.querySelector('#main-footer');
  const footerPath = "/partials/footer.html";
  const headerPath = "/partials/header.html";
  const footerTemplate = await loadTemplate(footerPath);
  const headerTemplate = await loadTemplate(headerPath);
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

export async function loadTemplate (path) {
  const response = await fetch(path);
  const html = await response.text();
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}