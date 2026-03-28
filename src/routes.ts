import { Router } from "express";

import userRoutes from "./modules/user/user-routes.ts";

const routes = Router();

routes.use("/user", userRoutes);

export default routes;
