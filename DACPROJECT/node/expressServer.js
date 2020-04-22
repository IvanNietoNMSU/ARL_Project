const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  createTable,
  createDatabase,
  queryTable,
  insertQuery,
  initialize,
  createProject,
  allProjects,
  deleteProject,
} = require("./databaseController"); //require(path.join(__dirname, "./databaseController"));

const { syncData_client, syncData_server } = require("./syncer.js");

module.exports.server = server;
async function server() {
  app.use(cors());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
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
      createProject(req.query.name, req.query.description);
      res.end("Project " + req.query.name + " Created");
    }
  });

  // Returns all projects declared by user as stated in projects table of root database
  app.get("/getallprojects", async (req, res) => {
    let response = await allProjects();
    res.send(response);
  });

  app.put("/syncdata_client", async (req, res) => {
    let response = await syncData_client(
      req.body.ip,
      req.body.port,
      req.body.project
    );
    res.send(response);
  });

  app.put("/syncdata_server", async (req, res) => {
    let response = await syncData_server(req.body.port);
    res.send(response);
  });

  app.get("/getentries", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      let response = await queryTable(
        req.query.name,
        "SELECT * FROM findings WHERE taskid=0"
      ).catch();
      const response2 = await queryTable(
        req.query.name,
        "SELECT * FROM tasks"
      ).catch();
      response = response.concat(response2);
      res.setHeader("Content-Type", "application/json");
      res.json(response);
      res.end();
    }
  });

  // Adds a finding to the specified project (database)
  app.put("/addfinding", async (req, res) => {
    if (req.body.name === "undefined") res.send("Database name is required");
    else {
      let data =
        req.body.taskid +
        ',"finding", "' +
        req.body.name +
        '", "none", "To Do", "' +
        req.body.desc +
        '" ';
      let columns = " taskId , type , title, assignedTo , status, description ";
      const sql =
        "INSERT INTO findings (" + columns + ") VALUES ( " + data + ")";
      const sqlUpdate =
        "UPDATE findings SET (" +
        columns +
        ") = ( " +
        data +
        ") WHERE id=" +
        req.body.pk;
      let response = await insertQuery(
        req.body.projectname,
        req.body.pk > -1 ? sqlUpdate : sql
      );
      res.send(response);
    }
  });

  app.put("/addtask", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      const columns = "type, title, assignedTo, status, description ";
      const data =
        '"task", "' +
        req.query.name +
        '", "none", "To Do", "' +
        req.query.desc +
        '" ';
      const sql = "INSERT INTO tasks (" + columns + ") VALUES ( " + data + ")";
      const response = await insertQuery(req.query.projectname, sql);
      res.send(response);
    }
  });

  app.put("/deleteprojects", async (req, res) => {
    if (req.body.name === "undefined")
      res.send("Empty list of projects to delete");
    else {
      const response = await deleteProject(req.body.projects);
      res.send(response);
    }
  });

  app.get("/findingsoftask", async (req, res) => {
    if (req.query.name === "undefined") res.send("Database name is required");
    else {
      const response = await queryTable(
        req.query.name,
        "SELECT * FROM findings WHERE taskid=" + req.query.taskid
      ).catch();
      res.setHeader("Content-Type", "application/json");
      res.json(response);
      res.end();
    }
  });

  app.put("/uploadimage", async (req, res) => {
    console.log(req);
    if (req.body.name === "undefined") res.send("Database name is required");
    else {
      const sql =
        "INSERT INTO images ( image ) VALUES ( " + req.body.image + ")";
      const response = await insertQuery(req.body.name, sql);
      res.send(response);
    }
  });

  initialize();
  app.listen(3001, () => console.log("App listening on port 3001!"));
}
