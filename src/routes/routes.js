const express = require("express");
const routes = express.Router();

const {
  getProducts,
  createProduct,
} = require("../controllers/productsController");
const {
  validateProductFields,
  validateData,
} = require("../middlewares/validateProduct");

// Products routes

routes.get("/products", getProducts);
routes.post("/products", validateProductFields, validateData, createProduct);

module.exports = routes;
