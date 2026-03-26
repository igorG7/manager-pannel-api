import App from "./app.ts";

const PORT = process.env.PORT || 3000;
const app = App.app;

app.on("mount", () => {
  app.listen(PORT, () => {
    console.log("Server started");
    console.log(`Running in: http://localhost:${PORT}`);
  });
});
