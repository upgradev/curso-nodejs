const express = require("express");
const path = require("path");

const app = express();
const port = 3000; //variavel de ambiente

const users = require("./users");

// ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const basepath = path.join(__dirname, "templates");

app.use("/users", users);

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.listen(port, () => {
  console.log(`app rodando na porta ${port}`);
});
