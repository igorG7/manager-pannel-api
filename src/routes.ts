import { Router } from "express";

import { launchError } from "./shared/middlewares/globalError-middleware.ts";

import userRoutes from "./modules/user/user-routes.ts";
import productRoutes from "./modules/products/product-routes.ts";
import stockMovementRoutes from "./modules/stock/stock-routes.ts";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
routes.use("/stock", stockMovementRoutes);

routes.use(launchError);

export default routes;
