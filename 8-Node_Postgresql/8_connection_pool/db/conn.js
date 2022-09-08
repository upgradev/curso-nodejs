const { Pool } = require("pg");

const conn = new Pool({
  max: 10,
  host: "localhost",
  user: "postgres",
  password: "",
  port: 5432,
  database: "",
});

module.exports = conn;