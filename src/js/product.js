import ProductDetails from "./productDetails.mjs";
import ProductData from "./ProductData.mjs";
import { setLocalStorage, getParams } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(product) {
 console.log(product);
  setLocalStorage("so-cart", product);
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
