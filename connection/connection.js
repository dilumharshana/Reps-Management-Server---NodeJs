const sql = require("mysql");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
  multipleStatements: true,
});

module.exports = connection;
