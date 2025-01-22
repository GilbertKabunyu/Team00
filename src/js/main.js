import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";

const dataSource = new ProductData("tents");
console.log(dataSource);

const listElement = document.getElementById("listElement")

const lista = new ProductListing("tents", dataSource, listElement);
lista.init();
//lista.renderList();

const productData = new ProductData("tents");
const example = document.querySelector(".product-list");
const productList = new ProductListing(
  productData.category,
  productData,
  example,
);
productList.init();

