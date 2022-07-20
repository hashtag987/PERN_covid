const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "hello12345",
  host: "localhost",
  port: 5432,
  database: "covid"
});

module.exports = pool;
