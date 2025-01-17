import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.getElementById("880RR").addEventListener("click", removeCartItem());
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" type="button"><span id="${item.Id}">X</span></button>
</li>`;

  return newItem;
}

function removeCartItem() {
  const storedItem = getLocalStorage("so-cart" || []);
  const updatedItem = storedItem.filter((item) => item.Id !== item.Id);
  setLocalStorage("so-cart", updatedItem);
}

renderCartContents();
