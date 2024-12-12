const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const staticPath = path.join(__dirname, "./assets");
console.log("Servindo arquivos estáticos de:", staticPath);

app.use("/", express.static(path.join(__dirname, ".")));

app.use("/assets", express.static(path.join(__dirname, "./assets")));

app.get("/", (req, res) => {
  res.send(
    "<h1>Servidor de Imagens Ativo!</h1><p>Use /assets/livro-1.png para acessar uma imagem.</p>"
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
