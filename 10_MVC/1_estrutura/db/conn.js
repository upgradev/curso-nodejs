const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nomedobanco", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Conectado");
} catch (error) {
  console.log(`Não foi possivel conectar: ${error}`);
}

exports.default = sequelize;
