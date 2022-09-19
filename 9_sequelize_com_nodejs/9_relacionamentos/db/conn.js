const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("databasename", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

// try {
//   sequelize.authenticate();
//   console.log("Conectado com Sucesso com Sequelize");
// } catch (error) {
//   console.log("Não foi possivel conectar: ", error);
// }

module.exports = sequelize;
