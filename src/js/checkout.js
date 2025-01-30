import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
const selector = document.querySelector(".order-summary");
const checkout = new CheckoutProcess("so-cart", selector);
checkout.init();

const zipCode = document.querySelector("#zip");
zipCode.addEventListener("input", (event) => {
    if (event.target.value.length === 6) {
        checkout.calculateOrderTotal()
    } else {
        console.log("HI");
    }
  
});