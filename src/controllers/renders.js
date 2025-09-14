import { Router } from "express";
const routes = new Router();

import { home } from "./homeController.js";
import { controlProduct, registerProduct } from "./productsController.js";
import { registerAdm, loginAdm } from "./usersController.js";

import { controlPermissions } from "../middlewares/usersMiddleware.js";

routes.get("/produtos", controlPermissions, home);

routes.get("/produtos/novo", controlPermissions, registerProduct);

routes.get("/admin/login", loginAdm);

routes.get("/admin/cadastrar", registerAdm);

routes.get("/produtos/controle", controlPermissions, controlProduct);

export default routes;
