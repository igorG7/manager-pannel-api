const express = require("express");
const routes = require("./src/routes/routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const connectDB = require("./src/config/mongodbConfig");
const configureLess = require("./src/config/lessConfig");

const app = express();

app.use(helmet());
connectDB(app);
configureLess(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(csrf());
//app.use(routes);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "views"));

app.on("Ready", () => {
  app.listen(3000, () => {
    console.log("Server started");
    console.log("Running in: http://localhost:3000");
  });
});
