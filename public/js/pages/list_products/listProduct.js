import { Card } from "./productCard.js";

const getProducts = async (event) => {
  try {
    const list = document.querySelector(".products");
    list.innerHTML = "";

    const value = event?.target.value.trim().replace(/\s+/g, " ");
    const response = await axios.get(query(value));

    const products = response.data.data;
    products.forEach((data) => new Card(data));
  } catch (error) {
    console.log(error.response);
    new Card();
  }
};

const query = (value = "") => {
  const query = `products?productName=${value}&providerName=${value}&makerName=${value}`;
  return query;
};

const debounce = (func, delay) => {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

getProducts();
const search = document.querySelector(".search-input");
search.addEventListener("input", debounce(getProducts, 1000));
