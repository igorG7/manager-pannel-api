import { Router } from "express";

import controller from "./stock-controller.ts";
import { movementStock, manyMovementStock } from "./middlewares/index.ts";

const routes = Router();

routes.get("/", controller.list);
routes.post("/in", manyMovementStock, controller.moveIn);
routes.post("/out", movementStock, controller.moveOut);

export default routes;
