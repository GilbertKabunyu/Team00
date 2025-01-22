import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    //This makes sure that the event is not a event bubbling
    //It looks like that event bubbling is when an event occurs on an element, it also propagates(bubbles up) to its parent elements.
    //So basicaly, instead of taking the Id of the button, I was getting the Id of li element.
    const buttonElement = event.target.closest(".remove-button");
    const itemId = buttonElement.id; //Gets the ID of the button which is the Id of the product.
  
    //Gets the items from the local storage
    const storedItem = getLocalStorage("so-cart" || []);
  
    //Updates the localStorage by removing the object with the Item.Id searched
    const updatedItem = storedItem.filter((item) => item.Id !== itemId);
  
    //Sends the updated version to the localStorage.
    const test = setLocalStorage("so-cart", updatedItem);
  
    //Find the closest .cart-card class to remove it
    const cartItem = buttonElement.closest(".cart-card");
  
    //Removes the whole li element to make cart look updated.
    if (cartItem) {
      cartItem.parentNode.removeChild(cartItem);
    }
  }


export default class ShoppingCart {
  constructor(key, parentSelector, removeSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.removeSelector = removeSelector;
  }
  renderCartContents() {
    const emptyCart = document.querySelector(".empty-cart");
    const cartItems = getLocalStorage(this.key);
    if (cartItems.length >= 1) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    } else {
      emptyCart.textContent = "You Have No Added Items In Your Cart";
    }
  }
  cartItemRemove() {
    const ram = document.querySelectorAll(this.removeSelector);
    ram.forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });
  }
  
}
