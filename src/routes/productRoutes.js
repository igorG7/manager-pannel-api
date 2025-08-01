import { Router } from "express";

const routes = new Router();

import * as product from "../controllers/productsController.js";
import * as validate from "../middlewares/validateProduct.js";

routes.get("/", product.getProducts);

routes.get("/:id", product.findProductbyId);

routes.post(
  "/",
  validate.validateProductFields,
  validate.validateData,
  product.createProduct
);

routes.put(
  "/:id",
  validate.validateProductFields,
  validate.validateData,
  product.updateProducts
);

routes.delete("/:id", product.deleteProduct);
export default routes;
