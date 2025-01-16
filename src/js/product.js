import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParams } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
//async function addToCartHandler(e) {
//  const nProduct = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(nProduct);
//}

// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
