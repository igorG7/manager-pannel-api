const lessMiddleware = require("less-middleware");
const path = require("path");

const configureLess = (app) => {
  app.use(
    lessMiddleware(path.resolve(__dirname, "..", "..", "public", "less"), {
      dest: path.join(__dirname, "..", "..", "public", "css"), // Pasta de destino para o CSS
      preprocess: {
        path: (pathname, req) => pathname.replace("/less", "/css"), // Mapeia a pasta /less para /css
      },
      debug: true,
    })
  );
};

module.exports = configureLess;
