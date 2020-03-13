const sqlite3 = require("sqlite3").verbose();

// // Create database if does not already exist
// let db = new sqlite3.Database(
//   "./test.db",
//   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   err => {
//     if (err) console.log(err);
//     console.log("Successfully created database");
//   }
// );

// // Create new table users if it does not already exist
// db.run("CREATE TABLE IF NOT EXISTS users(name text)");

// // Since syntax is (?) for every entry we do this to save time
// let users = ["Ivan", "Aaron", "Austin", "EvilIvan"];
// let placeholders = users.map(users => "(?)").join(",");

// let sql = "INSERT INTO users(name) VALUES " + placeholders;
// // db.run(sql, users, function(err) {
// //   if (err) console.log(err);
// //   console.log("Successfully inserted users");
// // });

// sql = "SELECT * FROM users";
// db.each(sql, (err, row) => {
//   if (err) console.log(err);
//   console.log(row.name);
// });

// db.close();
module.exports = {
  createDatabase: async path => {
    let db = new sqlite3.Database(
      path,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        console.log("Database created successfully!");
      }
    );
    db.close();
    return path;
  },

  createTable: async (database, table, columns) => {
    let db = new sqlite3.Database(
      database,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        console.log("Database opened successfully");
      }
    );

    db.run("CREATE TABLE IF NOT EXISTS " + table + " (" + columns + ")");
    db.close();
    console.log("Table " + table + " created successfully");
  },

  insertQuery: async (database, table, data, colums) => {
    let db = new sqlite3.Database(
      database,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        console.log("Connected successfully in runQuery");
      }
    );

    let placeholders = data.map(data => "(?)").join(",");
    let sql =
      "INSERT INTO " + table + "(" + colums + ") VALUES " + placeholders;

    db.run(sql, data, function(err) {
      if (err) console.log(err);
      console.log("Successfully inserted users");
    });
    db.close();
    return null;
  },

  queryTable: async (database, sql) => {
    let db = new sqlite3.Database(
      database,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        console.log("Connected to database");
      }
    );

    let result;

    db.all(sql, (err, row) => {
      if (err) console.log(err);
      result = row;
    });

    db.close();
    return result;
  }
};
