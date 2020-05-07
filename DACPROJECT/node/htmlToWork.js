const htmlDocx = require("html-docx-js");
const fs = require("fs");
const { queryTable } = require("./databaseController");

module.exports = {
  /*
   * CLIENT code
   */
  htmlToWord: async (database) => {
    let response = await queryTable(database, "SELECT * FROM findings").catch();

    for (let i = 0; response[i]; i++)
      response[i] = { ...response[i], database: database };

    let html = "";
    await response.forEach(async (e) => {
      html = html + "<h2>" + e.title + "</h2>" + e.description;
    });

    const docx = htmlDocx.asBlob(html);
    fs.writeFile(
      "./" + database + "/" + database + "_Report.docx",
      docx,
      function (err) {
        if (err) throw err;
      }
    );
    return { status: 200, document: docx };
  },
};
