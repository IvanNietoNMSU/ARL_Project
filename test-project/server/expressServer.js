const cors = require("cors");
const express = require("express");
const app = express();
const {
  createTable,
  createDatabase,
  queryTable,
  insertQuery
} = require("./databaseController");

app.use(cors());

app.get("/", (req, res) => {
  let path = createDatabase("./project1.db");
  res.send("An alligator approaches!");
});

app.listen(3001, () => console.log("App listening on port 3001!"));
