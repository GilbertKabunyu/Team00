import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  //Event listener to remove item from Local Storage
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  })
  //if (document.getElementById("880RR") === null) {
  //  console.log("There is no items in the cart list");
  //} else {
//document.getElementById("880RR").addEventListener("click", removeCartItem);
  //}
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
    <button class="remove-button" id="${item.Id}" type="button"><span>X</span></button>
</li>`;

  return newItem;
}

function removeCartItem(event) {
  const itemId = event.target.id
  //Gets the items from the local storage
  const storedItem = getLocalStorage("so-cart" || []);
  //Updates the localStorage by removing the object with the Item.Id searched
  const updatedItem = storedItem.filter((item) => item.Id !== itemId);
  //Sends the updated version to the localStorage.
  setLocalStorage("so-cart", updatedItem);
}

renderCartContents();
