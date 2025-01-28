import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";


export function breadCrumb() {
    const link = document.getElementById("last-page-link");
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        setLocalStorage("current-page", window.location.href);

    } else if (getLocalStorage("current-page") !== "/index.html" || getLocalStorage("current-page") !== "/") {
        setLocalStorage("last-page", getLocalStorage("current-page"));
        setLocalStorage("current-page", window.location.href);

        // This should be called whne selecting a product, but it isn't being called. You finish this and you're done.
    } else if (getLocalStorage("list-items" !== window.location.search)) {
        const param = getParams("category");
        setLocalStorage("last-page", getLocalStorage("current-page"));
        setLocalStorage("current-page", window.location.href);
        setLocalStorage("list-items", param);
        link.innerHTML = getLocalStorage("list-items");
        link.addEventListener("click", changeURL(link));

    } else {
        console.log("There is no link")
    }
}

function changeURL(htmlElement) {
    const path = getLocalStorage("last-page")
    if (htmlElement) {
        htmlElement.href = path
    }
}