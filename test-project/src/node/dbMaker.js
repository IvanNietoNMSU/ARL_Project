var sqlite3 = require("sqlite3").verbose();
var path = require("path");

export function MakeDatabase() {
  var db = new sqlite3.Database(
    "../../db/test.db",
    sqlite3.OPEN_CREATE,
    err => {
      if (err) console.log("Error:(");
    }
  );

  let results;

  db.run("CREATE TABLE USERS(NAME text)");

  let languages = ["C++", "Python", "Java", "C#", "Go"];
  let placeholders = languages.map(language => "(?)").join(",");
  db.run("INSRET INTO users(name) VALUES " + placeholders, languages, function(
    err
  ) {
    if (err) console.log("Error inserting!");
    console.log("Successfull insert:)");
  });

  db.run("SELECT NAME FROM USERS", [], function(err, rows) {
    if (err) console.log(err);
    results = rows;
    console.log("Successfull query!");
  });

  return results;
} //end MakeDatabase
