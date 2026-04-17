import { Router } from "express";
import productController from "./product-controller.ts";
import { validateId } from "../shared/middlewares/validateId.ts";
import { createProduct, updateProduct } from "./middlewares/index.ts";

const routes = Router();

routes.post("/", createProduct, productController.createProduct);
routes.get("/", productController.listProducts);
routes.get("/:id", validateId, productController.listOne);
routes.patch("/:id", validateId, updateProduct, productController.updateProduct);
routes.delete("/:id", validateId, productController.removeProduct);

export default routes;
