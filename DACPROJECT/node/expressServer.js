const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  deleteEntry,
  queryTable,
  insertQuery,
  initialize,
  createProject,
  allProjects,
  deleteProject,
} = require("./databaseController");
const { htmlToWord } = require("./htmlToWork");
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
        '", "' +
        req.body.assigne +
        '", "' +
        req.body.status +
        '", "' +
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
        '", "' +
        req.query.assigne +
        '", "' +
        req.query.status +
        '", "' +
        req.query.desc +
        '" ';
      const sql = "INSERT INTO tasks (" + columns + ") VALUES ( " + data + ")";
      const sqlUpdate =
        "UPDATE tasks SET (" +
        columns +
        ") = ( " +
        data +
        ") WHERE id=" +
        req.query.id;
      const response = await insertQuery(
        req.query.projectname,
        req.query.id > -1 ? sqlUpdate : sql
      );
      res.send(response);
    }
  });

  app.put("/deleteprojects", async (req, res) => {
    if (req.body.name === "undefined")
      res.send("Empty list of projects to delete");
    else {
      const user = await queryTable(
        "root",
        "SELECT userName FROM users"
      ).catch();
      if (user.length < 1) {
        await insertQuery(
          "root",
          'INSERT INTO users ( "id", "userName" ) VALUES ( 0, "Test McTester" )'
        );
      }
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
    if (req.body.name === "undefined") res.send("Database name is required");
    else {
      const sql =
        "INSERT INTO images ( image ) VALUES ( " + req.body.image + ")";
      const response = await insertQuery(req.body.name, sql);
      res.send(response);
    }
  });

  app.get("/getusers", async (req, res) => {
    const response = await queryTable(
      "root",
      "SELECT userName FROM users"
    ).catch();

    res.setHeader("Content-Type", "application/json");
    res.json(response);
    res.end();
  });

  app.put("/updateusername", async (req, res) => {
    const response = await insertQuery(
      "root",
      'UPDATE users SET( "userName" ) = ( "' +
        req.body.username +
        '" ) WHERE id=0'
    );
    res.send(response);
  });

  app.put("/exportproject", async (req, res) => {
    const response = await htmlToWord(req.body.name).catch();
    res.send(response);
  });

  app.put("/adduser", async (req, res) => {
    const sql =
      'INSERT INTO users( userName ) VALUES ( "' + req.body.username + '" )';
    const response = await insertQuery("root", sql);
    res.send(response);
  });

  app.put("/deleteentry", async (req, res) => {
    if (req.body.type === "finding") {
      const sql = "DELETE FROM findings WHERE id=?";
      const result = await deleteEntry(req.body.project, sql, req.body.id);
      res.send(result);
    } else {
      const sql = "DELETE FROM tasks WHERE id=?";
      const result = await deleteEntry(
        req.body.project,
        sql,
        req.body.id
      ).catch((err) => {
        console.log(err);
      });
      const findingSql = "DELETE FROM findings WHERE taskid=?";
      const findingResult = await deleteEntry(
        req.body.project,
        findingSql,
        req.body.id
      ).catch((err) => {
        console.log(err);
      });
      res.send(findingResult);
    }
  });

  initialize();
  app.listen(3001, () => console.log("App listening on port 3001!"));
}
