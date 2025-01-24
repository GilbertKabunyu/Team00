import ProductListing from "./productList.mjs";
import ProductData from "./productData.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData();
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const productInfo = new ProductListing(productId, dataSource);
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
