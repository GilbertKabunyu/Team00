import { getLocalStorage } from "./utils.mjs";

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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();