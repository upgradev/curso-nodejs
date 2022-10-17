const bcrypt = require("bcryptjs");

// models
const User = require("../models/User");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    //se usuario existe
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado");
      res.render("auth/login");
      return;
    }

    //verificar password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Senha inválida");
      res.render("auth/login");
      return;
    }
     //inicializar a sessao
     req.session.userid = user.id;

     req.flash("message", "Login realizado com sucesso! ");

     // salvar a sessao
     req.session.save(() => {
       res.redirect("/");
     });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { email, name, password, confirmpassword } = req.body;

    //password match validation
    if (password != confirmpassword) {
      //mensagem
      req.flash("message", "As senhas não conferem, tente novamente");
      res.render("auth/register");

      return;
    }

    //check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "O email já esta em uso");
      res.render("auth/register");

      return;
    }

    //create a password
    const salt = bcrypt.genSaltSync(10);
    // create password with hash
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createUser = await User.create(user);

      //inicializar a sessao
      req.session.userid = createUser.id;

      req.flash("message", "Cadastro realizado com sucesso! ");

      // salvar a sessao
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
