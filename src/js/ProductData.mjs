const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
    /*return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);*/
  }
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(products);
    return data
    //find((item) => item.Id === id);
  }
  
  async searchByTerm(term) {
    const response = await fetch(`${baseURL}products/search?term=${term}`);
    const data = await convertToJson(response);
    return data.Result;
  }

}
