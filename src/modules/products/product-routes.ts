import { Router } from "express";
import productController from "./product-controller.ts";
import { validateId } from "../shared/middlewares/validateId.ts";
import { createProduct, deleteProduct, readProduct, updateProduct } from "./middlewares/index.ts";

const routes = Router();

routes.post("/", createProduct, productController.createProduct);
routes.get("/", productController.listProducts);
routes.get("/:id", validateId, readProduct, productController.listOne);
routes.patch("/:id", validateId, updateProduct, productController.updateProduct);
routes.delete("/:id", validateId, deleteProduct, productController.removeProduct);

export default routes;
