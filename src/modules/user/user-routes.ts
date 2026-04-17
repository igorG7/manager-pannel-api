import { Router } from "express";
import userController from "./user-controller.ts";

import { createUser, loginUser, updatePassword, updateUser } from "./middlewares/index.ts";

const routes = Router();

routes.get("/", userController.listUsers);
routes.get("/:id", userController.listOne);

routes.post("/sign-up", createUser, userController.createUser);
routes.post("/sign-in", loginUser, userController.loginUser);

routes.patch("/update-password", updatePassword, userController.updateUserPassword);
routes.patch("/update/:id", updateUser, userController.updateUser);
routes.patch("/:id/deactivate", userController.deactivateUser);

export default routes;
