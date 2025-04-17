const express = require("express");
const routes = express.Router();

const {
  getProducts,
  createProduct,
  updateProducts,
  deleteProduct,
} = require("../controllers/productsController");

const {
  validateProductFields,
  validateData,
} = require("../middlewares/validateProduct");

const { home } = require("../controllers/homeController");
const { registerProduct } = require("../controllers/registerProductController");
const { loginAdm } = require("../controllers/loginAdmController");

// Interface routes

routes.get("/index", home);
routes.get("/register-product", registerProduct);
routes.get("/login-administrador", loginAdm);

// Products routes

routes.get("/products", getProducts);
routes.post("/products", validateProductFields, validateData, createProduct);
routes.delete("/products/:id", deleteProduct);
routes.put(
  "/products/:id",
  validateProductFields,
  validateData,
  updateProducts
);

module.exports = routes;
