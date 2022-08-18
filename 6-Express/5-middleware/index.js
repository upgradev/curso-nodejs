const express = require("express");
const path = require("path");

const app = express();
const port = 3000; //variavel de ambiente

const basepath = path.join(__dirname, "templates");

const checkAuth = function (req, res, next) {
  req.authStatus = false;

  if (req.authStatus) {
    console.log("esta logado, pode continuar");
    next();
  } else {
    console.log("Não esta logado, faça o login");
    next();
  }
};

app.use(checkAuth);

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.listen(port, () => {
  console.log(`app rodando na porta ${port}`);
});
