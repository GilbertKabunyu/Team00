import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs"
import { getParams } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const productInfo = new ProductDetails(productId, dataSource);
productInfo.init();


function addProductToCart(product) {
  console.log(`This is the product: ${product}`);
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const nProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(nProduct);
}
// removed it since this event listener is already on the productDetails.mjs on the async init function.
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);

