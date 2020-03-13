const sqlite3 = require("sqlite3").verbose();

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
        else console.log("Success!");
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
        else console.log("Success!");
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
        else console.log("Success!");
      }
    );

    let result;

    db.all(sql, (err, row) => {
      if (err) console.log(err);
      else result = row;
    });

    db.close();
    return result;
  },

  initialize: async () => {
    console.log("In initialize");
    let db = new sqlite3.Database(
      "./root.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        else console.log("Database created successfully!");
      }
    );

    db.run("CREATE TABLE IF NOT EXISTS projects (projectName text)");
    db.run("CREATE TABLE IF NOT EXISTS users (userName text)");

    db.close();
  },

  createProject: async projectName => {
    let path = "";
    path = path.concat("./", projectName, ".db");
    let db = new sqlite3.Database(
      path,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
        else console.log("Database created successfully!");
      }
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, type text, title text, assignedTo text, status text, description text )"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS findings (id INTEGER PRIMARY KEY AUTOINCREMENT, taskId INTEGER, type text, title text, assignedTo text, status text, description text)"
    );

    db.close();

    db = new sqlite3.Database("./root.db");

    let sql = "INSERT INTO projects(projectName) VALUES (?)";

    db.run(sql, [projectName], function(err) {
      if (err) console.log(err);
      console.log("Successfully inserted");
    });

    db.close;
  },

  allProjects: async () => {
    let db = new sqlite3.Database(
      "./root.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) console.log(err);
      }
    );

    let results = [];
    let promise = await new Promise((resolve, reject) => {
      db.all("SELECT projectName name FROM projects", [], (err, rows) => {
        if (err) {
          return err;
        }
        rows.map(item => {
          results.push(item.name);
        });
        resolve();
      });
    });

    db.close();

    return results;
  }
};
