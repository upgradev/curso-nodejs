const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Ana",
    surname: "Teste",
    age: 30,
  };

  const palavra = "Palavra olá";

  const auth = false;

  res.render("home", { user: user, palavra, auth });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
