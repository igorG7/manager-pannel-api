import express from "express";
import { resolve } from "path";

import helmet from "helmet";
import { user } from "./src/middlewares/globalsMiddleware.js";

import sessionConfig from "./src/config/sessionConfig.js";
import connectDB from "./src/config/mongodbConfig.js";

import renders from "./src/controllers/renders.js";
import productRoutes from "./src/routes/productRoutes.js";
import usersRoutes from "./src/routes/usersRoutes.js";

class App {
  constructor() {
    this.app = express();

    this.config();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(renders);
    this.app.use("/products/", productRoutes);
    this.app.use("/users/", usersRoutes);
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve("./", "public")));
    this.app.use(
      "/lib/axios",
      express.static("./" + "/node_modules/axios/dist")
    );
    this.app.use(
      "/lib/validator",
      express.static("./" + "/node_modules/validator")
    );
    this.app.use(user);
  }

  config() {
    connectDB(this.app);
    this.app.use(sessionConfig);

    this.app.set("view engine", "ejs");
    this.app.set("views", resolve("./", "src", "views"));
  }
}

export default new App().app;
