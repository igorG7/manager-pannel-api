import { Router } from "express";

import controller from "./client-controller.ts";
import { createClient, updateClient, readClient } from "./middlewares/index.ts";
import { validateId } from "../shared/middlewares/validateId.ts";

const routes = Router();

routes.get("/", readClient, controller.list);
routes.get("/:id", validateId, controller.listOne);
routes.post("/", createClient, controller.createClient);
routes.patch("/:id", validateId, updateClient, controller.updateClient);
routes.delete("/:id", validateId, controller.deleteClient);

export default routes;
