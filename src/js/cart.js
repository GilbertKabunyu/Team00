import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const emptyCart = document.querySelector(".empty-cart");
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total-price");

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    cartFooter.style.display = "flex";
    cartTotal.innerHTML = `<span class="price-total">$${cartItems.reduce((acc, curr) => {return acc + curr.FinalPrice;}, 0)}</span>`;
  } else {
    emptyCart.textContent = "You Have No Added Items In Your Cart";
  }
}

//item.quantity does not exist, probably an if statement would fix it. if (itemQuantity in localStorage with the same ID) = item.count(ID)
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.id}">
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
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
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

renderCartContents();
//Event listener to remove item from Local Storage. It needs to be outside so that the event is put, after the whole page is rendered.
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", removeCartItem);
});

