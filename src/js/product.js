import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const productInfo = new ProductDetails(productId, dataSource);
productInfo.init();
loadHeaderFooter();
// add to cart button event handler
//async function addToCartHandler(e) {
//  const nProduct = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(nProduct);
//}

// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
