const { Pool } = require("pg");

const conn = new Pool({
  max: 10,
  host: "localhost",
  user: "postgres",
  password: "postgres",
  port: 5432,
  database: "estudonodejs",
});

module.exports = conn;