import { Router } from "express";

import userRoutes from "./modules/user/user-routes.ts";
import productRoutes from "./modules/products/product-routes.ts";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);

export default routes;
