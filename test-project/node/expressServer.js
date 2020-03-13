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

  app.get("/", async (req, res) => {
    if (req.query.do === "firststart") {
      initialize();
      res.send(request.concat("Request for ", req.query.do, " complete"));
    } else if (req.query.do === "createproject") {
      createProject(req.query.name.replace(/ /g, "_"));
      res.send(request.concat("Request for ", req.query.do, " complete"));
    } else if (req.query.do === "getallprojects") {
      let response = await allProjects();
      res.send(response);
    } else {
      //let path = createDatabase("./project1.db");
    }
    let request = "";
    //res.send(request.concat("Request for ", req.query.do, " complete"));
  });

  app.listen(3001, () => console.log("App listening on port 3001!"));
}
