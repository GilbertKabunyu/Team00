import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails(this.product);
    
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', () => { this.addProductToCart(this.product) });
  }

  addProductToCart(product) {
    // product should be an array
    const currentCart = getLocalStorage("so-cart") || [];
    currentCart.push(product);
    setLocalStorage("so-cart", currentCart);
  }

  renderProductDetails(product) {
    const html = document.querySelector(".product-detail")
    
    const newProduct = `<section class="product-detail">
        <h3>${product.Result.Brand.Name}</h3>
  
        <h2 class="divider">${product.Result.Name}</h2>
  
        <img
          class="divider"
          src="${product.Result.Images.PrimaryLarge}"
          alt="${product.Result.Name}"
        />
  
        <p class="product-card__price">${product.Result.FinalPrice}</p>
  
        <p class="product__color">${product.Result.Colors[0].ColorName}</p>
  
        <p class="product__description">${product.Result.DescriptionHtmlSimple}</p>
  
        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Result.Id}>Add to Cart</button>
        </div>
      </section>`
    html.innerHTML = newProduct;
  }
}
