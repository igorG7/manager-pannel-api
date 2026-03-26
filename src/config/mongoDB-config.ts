import { configDotenv } from "dotenv";
import type { Application } from "express";
import mongoose from "mongoose";

configDotenv();

class MongoDB {
  async connect(app: Application) {
    mongoose
      .connect(process.env.CONNECTION as string)
      .then(() => {
        console.log("Database connected");
        app.emit("mount");
      })
      .catch((error) => console.log("Could not connect to database", error));
  }
}

export default new MongoDB();
