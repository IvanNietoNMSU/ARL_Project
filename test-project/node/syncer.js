const sqlite3 = require("sqlite3").verbose();


var PROTO_PATH = __dirname + '/syncer.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var syncer_proto = grpc.loadPackageDefinition(packageDefinition).syncer;


function syncData(call, callback) {
  console.log("[*] Recieved some data to store [*]")
  console.log("[type]        " + call.request.type)
  console.log("[title]       " + call.request.title)
  console.log("[assignedTo]  " + call.request.assignedTo)
  console.log("[status]      " + call.request.status)
  console.log("[description] " + call.request.description)
  console.log("[*] End recieved data [*]")

  // insert into the desired database here
  callback(null, {status: 200});// + call.request.name});
}


const {
	queryTable
} = require("./databaseController");

module.exports = {

	/* 
	 * CLIENT code 
	 */
	syncData_client: async (ip,port) => {

	  console.log("[*] Syncing Data to server on port: " + port)
	  // start up grpc connection to the server
	  var client = new syncer_proto.DatabaseSync(ip+':'+port,
										   grpc.credentials.createInsecure());

	  let db = new sqlite3.Database(
		  "./P1.db",
		  sqlite3.OPEN_READ,
		  err => {
			  if (err) console.log(err);
		  }
	  );

	  let results = [];
	  let promise = new Promise((resolve, reject) => {
		  db.all("SELECT * FROM findings;", [], (err, rows) => {
			  if (err) {
				  console.log("error blah")
				  return err;
			  }
				  console.log("Sending data over!")
			  rows.map(item => {

				  // send entry to server through grpc connection
				  // build the grpc object from the fields pulled out of the db
				  // entry
				  // status is useless right now, but it is nice to return something
				  client.syncData({taskId: item.taskId,
									type: item.type,
									title: item.title,
									assignedTo: item.assignedTo,
									status: item.status,
									description: item.description}, function(err, response) {
					console.log('Status:', response.status);
				  });

			  });
		  });
		  db.close();
	  });
	},

	/* 
	 * SERVER code :: syncData is called when a connection is made 
	 */
	syncData_server: async (port) => {
	  console.log("[*] Starting server on port: " + port)
	  var server = new grpc.Server();
	  server.addService(syncer_proto.DatabaseSync.service, {syncData: syncData});
	  server.bind('0.0.0.0:'+port, grpc.ServerCredentials.createInsecure());
	  server.start();
	},
};


