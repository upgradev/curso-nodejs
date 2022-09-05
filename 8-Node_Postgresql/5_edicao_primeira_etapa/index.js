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
      return;
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(`Erro ao buscar books`);
      return;
    }

    const books = data.rows;

    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books where id = ${id} `;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(`Erro ao buscar book`);
      return;
    }

    const book = data.rows[0];

    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books where id = ${id} `;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(`Erro ao buscar book para editar`);
      return;
    }

    const book = data.rows[0];

    res.render("editbook", { book });
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
