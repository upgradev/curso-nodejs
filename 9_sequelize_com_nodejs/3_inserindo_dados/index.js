const express = require("express");
const exphbs = require("express-handlebars");
// const { Pool } = require("pg");

const conn = require("./db/conn");
const User = require("./models/User");

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

app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  }

  await User.create({
    name,
    occupation,
    newsletter,
  });

  res.redirect("/");
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));

// app.listen(3000);
