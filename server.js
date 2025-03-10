const express = require("express");
const routes = require("./src/routes/routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(routes);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "views"));

app.listen(3000, () => {
  console.log("Servidor iniciado");
  console.log("Rodando em: http://localhost:3000");
});
