import { Router } from "express";

import * as users from "../controllers/usersController.js";
import { validationBodyRegister } from "../middlewares/usersMiddleware.js";

const routes = new Router();
routes.post("/register", validationBodyRegister, users.registerUser);
routes.post("/login", users.loginUser);

export default routes;
