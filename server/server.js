const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("*", (err, req, res, next) => {
  res.status(404).send(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
