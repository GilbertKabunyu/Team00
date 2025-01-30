import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        this.itemTotal = this.list.reduce((acc, item) => acc + item.Result.FinalPrice, 0);
        const subtotal = document.createElement("p");
        subtotal.textContent = `Subtotal: $${this.itemTotal.toFixed(2)} for ${this.list.length} item(s)`;
        this.outputSelector.appendChild(subtotal);
    }
    calculateOrderTotal() {
        this.shipping = 10 + ((this.list.length-1) * 2);
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const shipping = document.createElement("p");
        shipping.textContent = `Shipping: $${this.shipping.toFixed(2)}`;
        this.outputSelector.appendChild(shipping);
        const tax = document.createElement("p");
        tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
        this.outputSelector.appendChild(tax);
        const total = document.createElement("p");
        total.classList.add("order-total");
        total.textContent = `Total: $${this.orderTotal.toFixed(2)}`;
        this.outputSelector.appendChild(total);
    }
}