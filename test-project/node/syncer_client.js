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

const {
	queryTable
} = require("./databaseController");

module.exports = {
	syncData: async => {

	  // start up grpc connection to the server
	  var client = new syncer_proto.DatabaseSync('localhost:50051',
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

};

function main() {

	// start up grpc connection to the server
  var client = new syncer_proto.DatabaseSync('localhost:50051',
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

}

//main();
