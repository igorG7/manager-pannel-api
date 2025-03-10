require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = (app) => {
  mongoose
    .connect(process.env.CONNECTION)
    .then(() => {
      console.log("Data Base Connected");
      app.emit("Ready");
    })
    .catch((error) => console.log("Could not connect to database", error));
};

module.exports = connectDB;
