const htmlDocx = require("html-docx-js");
const fs = require("fs");
const { queryTable } = require("./databaseController");

module.exports = {
  /*
   * CLIENT code
   */
  htmlToWord: async (database) => {
    let response = await queryTable(
      database,
      "SELECT * FROM findings WHERE taskid=0"
    ).catch();
    const response2 = await queryTable(database, "SELECT * FROM tasks").catch();
    response = response.concat(response2);

    for (let i = 0; response[i]; i++)
      response[i] = { ...response[i], database: database };

    let html = "";
    await response.forEach(async (e) => {
      if (e.type === "finding")
        html = html + "<h2>" + e.title + "</h2>" + e.description;
      else {
        html = html + "<h1>" + e.title + "</h1><p>" + e.description + "</p>";
        const subFindings = await queryTable(
          e.database,
          "SELECT * FROM findings WHERE taskid=" + e.id
        ).catch();
        subFindings.forEach((f) => {
          html = html + "<h4>" + f.title + "</h4>" + f.description;
        });
      }
    });

    const docx = htmlDocx.asBlob(html);
    fs.writeFile(
      "./" + database + "/" + database + "Report.docx",
      docx,
      function (err) {
        if (err) throw err;
      }
    );
    return { status: 200, document: docx };
  },
};
