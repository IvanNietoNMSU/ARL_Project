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
  app.put("/createproject", async (req, res) => {
    createProject(req.query.name.replace(/ /g, "_"));
    res.end("Project " + req.query.name + " Created");
  });

  // Returns all projects declared by user as stated in projects table of root database
  app.get("/getallprojects", async (req, res) => {
    let response = await allProjects();
    res.send(response);
  });

  // NOT WORKING:/
  // Adds a finding to the specified project (database)
  app.put("/addfinding", async (req, res) => {
    if (req.query.do === "addfinding") {
      let data = [
        0,
        "finding",
        req.query.name,
        "none",
        "In_Progress",
        req.query.desc
      ];
      data =
        "0, finding," + req.query.name + ",none,In_Progress," + req.query.desc;
      let columns =
        " taskId , type , title, assignedTo , status, description text";
      let response = await insertQuery(
        req.query.projectname,
        "findings",
        data,
        columns
      );
    }
  });

  initialize();
  app.listen(3001, () => console.log("App listening on port 3001!"));
}
