const express = require("express");
const router = express.Router();
const path = require("path");


const basepath = path.join(__dirname, "../templates");

router.get("/add", (req, res) => {
  res.sendFile(`${basepath}/userForm.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;

  console.log(`O nome do usuário é ${name} e tem ${age} anos`);

  res.sendFile(`${basepath}/userForm.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  // leitura da tabela users, resgatar um usuario do banco
  console.log(`Estamos buscando pelo usuário: ${id}`);

  res.sendFile(`${basepath}.html`);
});

module.exports = router;
