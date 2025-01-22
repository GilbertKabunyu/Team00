import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ProductData("tents");
const example = document.querySelector(".product-list");
const productList = new ProductListing(
  productData.category,
  productData,
  example,
);
productList.init();
loadHeaderFooter();
