
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
  callback(null, {status: 200});// + call.request.name});
}

module.exports = {
	syncData: async => {
	  var server = new grpc.Server();
	  server.addService(syncer_proto.DatabaseSync.service, {syncData: syncData});
	  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
	  server.start();
	},

};


/**
 * Start up the grpc server for people to connect and send
 * data through
function main() {
  var server = new grpc.Server();
  server.addService(syncer_proto.DatabaseSync.service, {syncData: syncData});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
 */
