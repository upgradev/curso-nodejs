const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

// app.engine("handlebars", exphbs.engine());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender js",
    comments: 4,
  };

  res.render("blogpost", { post: post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprender Nodejs",
      category: "javaScript",
      body: "teste",
      comments: 4,
    },
    {
      title: "Aprender Php",
      category: "PHP",
      body: "teste",
      comments: 2,
    },
    {
      title: "Aprender Python",
      category: "Python",
      body: "teste",
      comments: 6,
    },
  ];
  res.render("blog", { posts });
});

app.get("/", (req, res) => {
  const user = {
    name: "Ana",
    surname: "Teste",
    age: 30,
  };

  const palavra = "Palavra olá";

  const auth = true;

  const approved = true;

  res.render("home", { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
