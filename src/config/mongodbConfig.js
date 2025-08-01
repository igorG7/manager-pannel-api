import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = (app) => {
  mongoose
    .connect(process.env.CONNECTION)
    .then(() => {
      console.log("Data Base Connected");
      app.emit("Ready");
    })
    .catch((error) => console.log("Could not connect to database", error));
};

export default connectDB;
