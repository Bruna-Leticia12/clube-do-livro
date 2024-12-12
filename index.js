const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use("/", express.static(path.join(__dirname, ".")));

app.use("/assets", express.static(path.join(__dirname, "./assets")));

app.get("/", (req, res) => {
  res.render(
    'login'
  );
});

app.get("/home", (req, res) => {
  res.render(
    'home'
  );
});

app.get("/compra", (req, res) => {
  res.render(
    'compra'
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
