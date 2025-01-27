import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";

//const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = "http://localhost:5173"

export function breadCrumb() {
    const link = document.getElementById("last-page-link");
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        setLocalStorage("current-page", window.location.pathname);

    } else if (getLocalStorage("current-page") !== "/index.html" || getLocalStorage("current-page") !== "/") {
        setLocalStorage("last-page", getLocalStorage("current-page") + getLocalStorage("list-items"));
        setLocalStorage("current-page", window.location.pathname);

        // This should be called whne selecting a product, but it isn't being called. You finish this and you're done.
    } else if (getLocalStorage("list-items" !== window.location.search)) {
        setLocalStorage("last-page", getLocalStorage("current-page") + getLocalStorage("list-items"));
        setLocalStorage("current-page", window.location.pathname);
        setLocalStorage("list-items", window.location.search);
        link.innerHTML = getLocalStorage("list-items");
        link.addEventListener("click", changeURL(link));

    } else {
        console.log("There is no link")
    }
}

function changeURL(htmlElement) {
    const path = getLocalStorage("last-page")
    if (htmlElement) {
        htmlElement.href = baseURL + path + getLocalStorage("list-items")
    }
}