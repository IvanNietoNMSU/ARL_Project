const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const git = require("nodegit");
const rimraf = require("rimraf");

module.exports = {
  createDatabase: async (database) => {
    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
        console.log("Database" + database + "created successfully!");
      }
    );
    await db.close();
    return database;
  },

  createTable: async (database, table, columns) => {
    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
      }
    );

    db.run("CREATE TABLE IF NOT EXISTS " + table + " (" + columns + ")");
    await db.close();
    console.log("Table " + table + " created successfully");
  },

  insertQuery: async (database, sql) => {
    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
        else console.log("Connected to ", database);
      }
    );

    let promise = await new Promise((resolve, reject) => {
      db.run(sql, [], function (err) {
        if (err) console.log(err);
        console.log("Successfully inserted into " + database);
        resolve();
      });
    });
    await db.close();
    return null;
  },

  queryTable: async (database, sql) => {
    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
      }
    );

    let results = [];
    let promise = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          reject();
          return err;
        }
        results = rows;
        resolve();
      });
    });
    await db.close();
    return results;
  },

  initialize: async () => {
    if (!fs.existsSync("./root")) fs.mkdirSync("./root");
    let db = new sqlite3.Database(
      "./root/root.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
        else console.log("Database created successfully!");
      }
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS projects (projectName text, description, text)"
    );
    db.run("CREATE TABLE IF NOT EXISTS users (userName text)");

    await db.close();
  },

  createProject: async (projectName, description) => {
    if (fs.existsSync("./" + projectName)) return { status: 400 };

    await fs.mkdirSync("./" + projectName);
    const pathToRepo = require("path").resolve("./" + projectName);
    const isBare = 0;
    git.Repository.init(pathToRepo, isBare).then((repo) => {
      console.log("Repo " + projectName + " created.");
    });

    let path = "";
    path = path.concat("./", projectName, "/", projectName, ".db");
    let db = new sqlite3.Database(
      path,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
        else console.log("Database created successfully!");
      }
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, type text, title text, assignedTo text, status text, description text )",
      [],
      function (err) {
        if (err) console.log("ERROR:", err);
        console.log("Successfully inserted task table into " + projectName);
      }
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS findings(id INTEGER PRIMARY KEY AUTOINCREMENT, taskId INTEGER, type text, title text, assignedTo text, status text, description text)",
      [],
      function (err) {
        if (err) console.log("ERROR:", err);
        console.log("Successfully inserted findings table into " + projectName);
      }
    );

    await db.close();

    db = new sqlite3.Database("./root/root.db");

    let sql = "INSERT INTO projects(projectName, description) VALUES (?, ?)";

    db.run(sql, [projectName, description], function (err) {
      if (err) console.log(err);
      console.log("Successfully inserted");
    });

    await db.close;
  },

  allProjects: async () => {
    if (!fs.existsSync("./root")) fs.mkdirSync("./root");
    let db = new sqlite3.Database(
      "./root/root.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
      }
    );

    let results = [];
    let promise = await new Promise((resolve, reject) => {
      db.all(
        "SELECT projectName name, description FROM projects",
        [],
        (err, rows) => {
          if (err) {
            return err;
          }
          rows.map((item) => {
            results.push(item);
          });
          resolve();
        }
      );
    });

    await db.close();
    return results;
  },

  deleteEntry: async (database, sql, element) => {
    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) console.log(err);
      }
    );

    let results = [];
    let promise = await new Promise((resolve, reject) => {
      db.run(sql, [element], (err, rows) => {
        if (err) {
          console.log(err);
          reject();
          return err;
        }
        results = rows;
        resolve();
      });
    });
    await db.close();
    return results;
  },

  deleteProject: async (projects) => {
    const { deleteEntry } = require("./databaseController");
    projects.forEach(async (element) => {
      rimraf("./" + element, async () => {
        console.log(element, "deleted");
        const sql = "DELETE FROM projects WHERE projectName = ?";
        await deleteEntry("root", sql, element).catch();
      });
    });
    return { status: 200 };
  },
};
