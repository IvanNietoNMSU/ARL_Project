const htmlDocx = require("html-to-text");
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

    const docx = htmlDocx.fromString(html, {
      wordwrap: 130
    });
    fs.writeFile(
      "./" + database + "/" + database + "_Report.txt",
      docx,
      function (err) {
        if (err) throw err;
      }
    );
    return { status: 200, document: docx };
  },
};
