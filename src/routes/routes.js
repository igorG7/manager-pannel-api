const express = require("express");
const routes = express.Router();

const {
  getProducts,
  findProductbyId,
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
const { registerAdm } = require("../controllers/registerAdmController");
const { controlProduct } = require("../controllers/controlProductController");

const { registerUser, loginUser } = require("../controllers/usersController");
const usersMid = require("../middlewares/usersMiddleware");

// Interface routes

routes.get("/index", usersMid.controlPermissions, home);
routes.get("/register-product", usersMid.controlPermissions, registerProduct);
routes.get("/login-administrator", loginAdm);
routes.get("/register-administrator-dashboard", registerAdm);
routes.get("/control-product", usersMid.controlPermissions, controlProduct);

// Products routes

routes.get("/products", getProducts);
routes.get("/product-id/:id", findProductbyId);
routes.post("/products", validateProductFields, validateData, createProduct);
routes.delete("/products/:id", deleteProduct);
routes.put(
  "/products/:id",
  validateProductFields,
  validateData,
  updateProducts
);

// Users routes

routes.post("/users/register", usersMid.validationBodyRegister, registerUser);
routes.post("/admin/login", loginUser);

module.exports = routes;
