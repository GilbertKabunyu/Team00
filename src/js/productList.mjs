import {renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=">
      <img src="${product.Image}" alt="Image of ">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a>
  </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        const productHeaderCategory = document.querySelector(".product-header-category");
        
        //let filteredlist = list.filter(filterData);
        this.renderList(list);
        this.rendercategory(productHeaderCategory);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
    rendercategory(elem) {
        const productHeaderCategory = `Top Product: <span class="prod-cat">${this.category}</span>`;
        elem.insertAdjacentHTML("afterbegin", productHeaderCategory);
    }
}
