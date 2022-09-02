const express = require("express");
const exphbs = require("express-handlebars");
const { Pool } = require("pg");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}') `;

  conn.query(query, function (err) {
    if (err) {
      console.log(`Erro Insert: ${err}`);
    }
    res.redirect("/");
  });
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
