const sqlite3 = require("sqlite3").verbose();
const {
  createDatabase,
  queryTable,
  insertQuery,
  createProject,
  allProjects,
} = require("./databaseController");

var PROTO_PATH = __dirname + "/syncer.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var syncer_proto = grpc.loadPackageDefinition(packageDefinition).syncer;

async function syncData(call, callback) {
  console.log("[*] Recieved some data to store [*]");
  console.log("[type]        " + call.request.type);
  console.log("[title]       " + call.request.title);
  console.log("[assignedTo]  " + call.request.assignedTo);
  console.log("[status]      " + call.request.status);
  console.log("[description] " + call.request.description);
  console.log("[database]    " + call.request.database);
  console.log("[*] End recieved data [*]");

  // insert into the desired database here

  let sql;
  if(call.request.type !== 'finding'){
    let data ='"' + call.request.taskId + '",' + '"task", "' +
    call.request.title +
    '", "' + call.request.assignedTo +'", "' + call.request.status + '", "' +
    call.request.description +
    '" ';
  let columns = "id, type , title, assignedTo , status, description ";
  sql = "INSERT INTO tasks (" + columns + ") VALUES ( " + data + ")";
  }
  else {
  let data =
    call.request.taskId +
    ',"finding", "' +
    call.request.title +
    '", "' + call.request.assignedTo +'", "' + call.request.status + '", "' +
    call.request.description +
    '" ';
  let columns = " taskId , type , title, assignedTo , status, description ";
  sql = "INSERT INTO findings (" + columns + ") VALUES ( " + data + ")";
}
  let response = await insertQuery(call.request.database, sql);
  callback(null, { status: 200, response: response }); // + call.request.name});
}

module.exports = {
  /*
   * CLIENT code
   */
  syncData_client: async (ip, port, database) => {
    console.log("[*] Syncing Data to server on port: " + port);
    // start up grpc connection to the server
    var client = new syncer_proto.DatabaseSync(
      ip + ":" + port,
      grpc.credentials.createInsecure()
    );

    let db = new sqlite3.Database(
      "./" + database + "/" + database + ".db",
      sqlite3.OPEN_READ,
      (err) => {
        if (err) console.log(err);
      }
    );

    let results = [];
    const random = Math.random() * (10000 - 100) + 100;
    let promise = new Promise((resolve, reject) => {
      db.all("SELECT * FROM findings;", [], (err, rows) => {
        if (err) {
          console.log("error blah");
          return err;
        }
        console.log("Sending data over!");

        for (let i = 0; rows[i]; i++)
          rows[i] = { ...rows[i], project: database };

        rows.map((item) => {
          // send entry to server through grpc connection
          // build the grpc object from the fields pulled out of the db
          // entry
          // status is useless right now, but it is nice to return something
          let id;
          if(item.taskId == 0) id = 0;
          else id =  item.taskId + random;
          client.syncData(
            {
              taskId: id,
              type: item.type,
              title: item.title,
              assignedTo: item.assignedTo,
              status: item.status,
              description: item.description,
              database: item.project,
              id: item.id,
            },
            function (err, response) {
              if (err) console.log(err);
              else console.log("Status:", response.status);
            }
          );
        });
      });
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
          console.log("error blah");
          return err;
        }
        console.log("Sending data over!");

        for (let i = 0; rows[i]; i++)
          rows[i] = { ...rows[i], project: database };

        rows.map((item) => {
          // send entry to server through grpc connection
          // build the grpc object from the fields pulled out of the db
          // entry
          // status is useless right now, but it is nice to return something
          client.syncData(
            {
              taskId: item.id + random,
              type: item.type,
              title: item.title,
              assignedTo: item.assignedTo,
              status: item.status,
              description: item.description,
              database: item.project,
              id: item.id,
            },
            function (err, response) {
              if (err) console.log(err);
              else console.log("Status:", response.status);
            }
          );
        });
      })
      db.close();
    });
  },

  /*
   * SERVER code :: syncData is called when a connection is made
   */
  syncData_server: async (port) => {
    console.log("[*] Starting server on port: " + port);
    var server = new grpc.Server();
    server.addService(syncer_proto.DatabaseSync.service, {
      syncData: syncData,
    });
    server.bind("0.0.0.0:" + port, grpc.ServerCredentials.createInsecure());
    server.start();
  },
};
