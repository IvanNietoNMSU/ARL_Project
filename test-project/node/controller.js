const {
  createTable,
  createDatabase,
  queryTable,
  insertQuery,
} = require("./databaseController");

let path = createDatabase("./project1.db");

// createTable(path, "users", "name text");

// let users = ["Ivan", "Aaron", "Austin", "EvilIvan"];
// insertQuery(path, "users", users, "name");

// let result = queryTable(path, "SELECT * FROM users");
// console.log(result);
