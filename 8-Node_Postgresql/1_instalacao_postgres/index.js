const express = require("express");
const exphbs = require("express-handlebars");
const { Pool } = require("pg");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/estudonodejs",
});

conn.connect(function (err) {
  if (err) {
    console.log(`Erro da conexao: ${err}`);
  }
  console.log("Conectou ao PostgreSQL");

  app.listen(3000);
});
