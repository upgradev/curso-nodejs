const express = require("express");
const exphbs = require("express-handlebars");
// const { Pool } = require("pg");

const conn = require("./db/conn");
const User = require("./models/User");
const Address = require("./models/Address");

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

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  console.log("User error: ", user);

  res.render("userview", { user });
});

app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.post("/users/update", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  const id = req.body.id;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });

  res.redirect("/");
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

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render("useredit", { user });
});

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });

  res.render("home", { users: users });
});

app.post("/address/create", async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    UserId,
    street,
    number,
    city,
  };

  await Address.create(address);

  res.redirect(`/users/edit/${UserId}`);
});

conn
  .sync()
  //.sync({ force: true }) //resetar tudo, recriando tabelas
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));

// app.listen(3000);
