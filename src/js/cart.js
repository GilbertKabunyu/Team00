import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const emptyCart = document.querySelector(".empty-cart");
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    emptyCart.textContent = "You Have No Added Items In Your Cart";
  }
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


// Function to update the number in the cart
function updateCartCount() {
  // Obtain the articles from localStorage
  const cartItems = getLocalStorage("so-cart") || [];
  // Calculate the total items
  const totalItems = cartItems.length;
  // Update the number in the HTML element with the "cart-count" class
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Function to remove an item from the cart
function removeCartItem(event) {
  // Prevent event bubbling
  const buttonElement = event.target.closest(".remove-button");
  const itemId = buttonElement.id; // Gets the ID of the button which is the ID of the product.

  // Get the items from localStorage
  const storedItem = getLocalStorage("so-cart") || [];

  // Update localStorage by removing the object with the matching itemId
  const updatedItem = storedItem.filter((item) => item.Id !== itemId);

  // Update localStorage with the new array
  setLocalStorage("so-cart", updatedItem);

  // Find the closest .cart-card class to remove it
  const cartItem = buttonElement.closest(".cart-card");

  // Remove the li element to update the cart visually
  if (cartItem) {
    cartItem.parentNode.removeChild(cartItem);
  }
  // Update the cart count after removing the item
  updateCartCount();
}

// Render the contents of the cart
renderCartContents();

// Update the cart count on page load
updateCartCount();

// Add event listener to remove items from localStorage
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", removeCartItem);
});
=======
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

renderCartContents();
//Event listener to remove item from Local Storage. It needs to be outside so that the event is put, after the whole page is rendered.
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", removeCartItem);
});

