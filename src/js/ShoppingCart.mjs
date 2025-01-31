import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Result.Images.PrimarySmall}"
      alt="${item.Result.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Result.Name}</h2>
  </a>
    <p class="cart-card__color">${item.Result.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: <input class="qty-input" id=${item.Result.Id}  type="number" value=1 step=1 min=1></p>
    <p class="cart-card__price id${item.Result.Id}">$${item.Result.FinalPrice}</p>
    <button class="remove-button" id="${item.Result.Id}" type="button"><span>X</span></button>
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
    console.log(storedItem);
  
    //Updates the localStorage by removing the object with the Item.Id searched
    const updatedItem = storedItem.filter((item) => item.Result.Id !== itemId);
    console.log(updatedItem);
  
    //Sends the updated version to the localStorage.
    const test = setLocalStorage("so-cart", updatedItem);
    const totalP = document.querySelector(".total-p");
    totalP.innerHTML = `$${updatedItem.reduce((acc, item) => acc + item.Result.FinalPrice, 0).toFixed(2)}`;
  
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
    const checkoutContainer = document.querySelector(".checkout-container");
    const totalP = document.querySelector(".total-p");
    const totalContainer = document.querySelector(".total-container");
    const emptyCart = document.querySelector(".empty-cart");
    const cartItems = getLocalStorage(this.key);
    if (cartItems.length >= 1) {  
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      totalP.innerHTML = `$${cartItems.reduce((acc, item) => acc + item.Result.FinalPrice, 0).toFixed(2)}`;
    } else {
      emptyCart.textContent = "You Have No Added Items In Your Cart";
      totalContainer.style.display = "none";
      checkoutContainer.style.display = "none";
    }
  }
  cartItemRemove() {
    
  }
  
  updateQty(itemId) {
    const item = getLocalStorage("so-cart").find((item) => item.Result.Id === itemId);
    const itemPrice = parseFloat(item.Result.FinalPrice);
    const itemQty = document.querySelector(`.qty-input[id="${itemId}"]`);
    const quantit = document.querySelectorAll(".qty-input");
    console.log(itemQty);
    const quantity = parseInt(document.querySelector(".qty-input").value);
    const newPrice = itemPrice * quantity;
    document.querySelector(`.id${itemId}`).textContent = `$${newPrice.toFixed(2)}`;
    this.updateTotalPrice();
    const qtyInput = document.querySelectorAll(".qty-input");

  }

  updateItemPrice(event) {
    const input = event.target.closest(".qty-input");
    const itemId = input.id;
    const item = getLocalStorage("so-cart").find((item) => item.Result.Id === itemId);
    const itemPrice = parseFloat(item.Result.FinalPrice);
    
    const quantity = parseInt(input.value);

    const newPrice = itemPrice * quantity;
    document.querySelector(`.id${itemId}`).textContent = `$${newPrice.toFixed(2)}`;

    // Optionally, update the total price
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const itemPrices = document.querySelectorAll('.cart-card__price');
    let totalPrice = 0;
    itemPrices.forEach(priceElement => {
      totalPrice += parseFloat(priceElement.textContent.replace('$', ''));
    });
    document.querySelector('.total-p').textContent = `$${totalPrice.toFixed(2)}`;
  }

  init() {
    this.renderCartContents();
    const ram = document.querySelectorAll(this.removeSelector);
    ram.forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });
    const qtyInput = document.querySelectorAll(".qty-input");
    qtyInput.forEach((input) => {
      input.addEventListener("change", this.updateItemPrice.bind(this));
    });
    
  }
  
}
