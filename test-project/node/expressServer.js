const cors = require("cors");
const express = require("express");
const app = express();
const {
  createTable,
  createDatabase,
  queryTable,
  insertQuery,
  initialize,
  createProject,
  allProjects
} = require("./databaseController"); //require(path.join(__dirname, "./databaseController"));

module.exports.server = server;
async function server() {
  app.use(cors());

  // Creates root database for keeping track of
  // declared projects and usernames
  app.put("/initialize", async (req, res) => {
    initialize();
    res.end("Root repository initialized");
  });

  // Creates a new project (database) with the specified name
  // return error if project already exists
  app.put("/createproject", async (req, res) => {
    if (req.query.name === "undefined") res.end("Database name is required");
    else {
      createProject(req.query.name.replace(/ /g, "_"));
      res.end("Project " + req.query.name + " Created");
    }
  });

  // Returns all projects declared by user as stated in projects table of root database
  app.get("/getallprojects", async (req, res) => {
    let response = await allProjects();
    res.send(response);
  });

  app.get("/getentries", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      let response = await queryTable(
        req.query.name,
        "SELECT * FROM findings"
      ).catch();
      const response2 = await queryTable(
        req.query.name,
        "SELECT * FROM tasks"
      ).catch();
      response = response.concat(response2);
      res.send(response);
    }
  });

  // Adds a finding to the specified project (database)
  app.put("/addfinding", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      let data =
        '0,"finding", "' +
        req.query.name +
        '", "none", "To Do", "' +
        req.query.desc +
        '" ';
      let columns = " taskId , type , title, assignedTo , status, description ";
      let sql = "INSERT INTO findings (" + columns + ") VALUES ( " + data + ")";

      let response = await insertQuery(req.query.projectname, sql);
      res.send(response);
    }
  });

  app.put("/addtask", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      const columns = "type, title, assignedTo, status, description ";
      const data =
        '"finding", "' +
        req.query.name +
        '", "none", "To Do", "' +
        req.query.desc +
        '" ';
      const sql = "INSERT INTO tasks (" + columns + ") VALUES ( " + data + ")";
      const response = await insertQuery(req.query.projectname, sql);
      res.send(response);
    }
  });

  initialize();
  app.listen(3001, () => console.log("App listening on port 3001!"));
}
