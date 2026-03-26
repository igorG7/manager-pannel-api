const PORT = process.env.PORT || 3000;

import app from "./app.js";

app.on("Ready", () => {
  app.listen(PORT, () => {
    console.log("Server started");
    console.log(`Running in: http://localhost:${PORT}`);
  });
});
