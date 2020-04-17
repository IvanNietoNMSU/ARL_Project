
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
  console.log("[*] Recieved some data to store... ")
  callback(null, {status: 200});// + call.request.name});
}


/**
 * Start up the grpc server for people to connect and send
 * data through
 */
function main() {
  var server = new grpc.Server();
  server.addService(syncer_proto.DatabaseSync.service, {syncData: syncData});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
