import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const cartData = getLocalStorage("so-cart");
console.log(cartData);
if (cartData == null) {
  setLocalStorage("so-cart", []);
}
function addProductToCart(product) {
  const cart= getLocalStorage("so-cart");
  if (cart.length == 0){
    setLocalStorage("so-cart", [product]);
  }
  else {
    setLocalStorage("so-cart", [...cart, product]);
  }
  //setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
