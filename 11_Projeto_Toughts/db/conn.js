const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("", "", "", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Conectado");
} catch (error) {
  console.log(`Não foi possivel conectar: ${error}`);
}

module.exports = sequelize;
