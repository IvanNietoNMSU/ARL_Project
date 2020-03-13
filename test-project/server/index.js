const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/greeting", (req, res) => {
  // Opening database. If it does not exist create it.
  let db = new sqlite3.Database("../db/test.db", sqlite3.OPEN_CREATE, err => {
    if (err) {
      const name = req.query.name || "World";
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ greeting: `Fault` }));
      return console.log(err.message);
    }
  });

  db.run("CREATE TABLE USERS(USERNAME text)");
  db.run("INSERT INTO users(username) VALUES(?)", ["ivan"], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("User inserted successfully");
  });

  db.close();
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Success!` }));
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
