const { application } = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

//Models
const Tought = require("./models/Tought");
const User = require("./models/User");

//import routes
const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

//import controller
const ToughtController = require("./controllers/ToughtController");

//template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

//uso do json
app.use(express.json());

//session middleware
//onde vai salvar as sessoes
app.use(
  session({
    name: "session",
    secret: "nosso-secret",
    resave: false, //se cair a conexao ele para
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000, //quanto tempo dura a sessao
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//flash messages, mensagens status do sistem, feedback do sistema
app.use(flash());

//public path
app.use(express.static("public"));

//salvar a sessao na resposta
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// Routes
app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);


app.get("/", ToughtController.showToughts);

//conexao
conn
  .sync()
    // .sync({force: true})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
