import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";

const productData = new ProductData("tents");
const example = document.querySelector(".product-list");
const productList = new ProductListing(
  productData.category,
  productData,
  example,
);
productList.init();

