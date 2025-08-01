import express from "express";
import { resolve } from "path";

import helmet from "helmet";
import { user } from "./src/middlewares/globalsMiddleware.js";

import session from "./src/config/sessionConfig.js";
import connectDB from "./src/config/mongodbConfig.js";

import productRoutes from "./src/routes/productRoutes.js";

class App {
  constructor() {
    this.app = express();
    this.routes();
    this.middlewares();
    this.config();
  }

  routes() {
    this.app.use("/products/", productRoutes);
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve("./", "public")));
    this.app.use(user);
  }

  config() {
    this.app.use(session);
    connectDB(this.app);

    this.app.set("view engine", "ejs");
    this.app.set("views", resolve("./", "src", "views"));
  }
}

export default new App().app;
