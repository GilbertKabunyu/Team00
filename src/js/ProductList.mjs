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
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
     // console.log("lista completa", list);
      const filteredList =this.filteredData(list);
      //console.log("lista filtrada", filteredList);
      // render the list - to be completed
      this.renderList(filteredList);
    }
    
    
    filteredData(productsFiltered) {
      const requiredProducts = ["880RR","985RF", "985PR","344YJ"];
      return productsFiltered.filter(product => requiredProducts.includes(product.Id));
      };
     /* renderList(list) {
        const htmlStrings = list.map(this.productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
      }*/
      renderList(filteredList){
        renderListWithTemplate(productCardTemplate, this.listElement, filteredList);
      }
  }

  