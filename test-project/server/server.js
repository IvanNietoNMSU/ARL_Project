const http = require("http");
var url = require("url");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // will print whatever is in the url after the address
  // Ex. http://127.0.0.1:3000/KillMe! will print KillMe!
  // res.write(req.url);

  // Parsing url parameters
  // Ex.http://127.0.0.1:3000/?year=2020&month=march prints
  var query = url.parse(req.url, true).query;
  var txt = query.year + " " + query.month;

  res.end(txt);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
