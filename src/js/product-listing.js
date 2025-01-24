import ProductData from "./productData.mjs";

import ProductListing from "./productList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

const category = getParams("category");

const productData = new ProductData();
const example = document.querySelector(".product-list");
const productList = new ProductListing(category, productData, example);

productList.init();
loadHeaderFooter();
