
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

function main() {
  var client = new syncer_proto.DatabaseSync('localhost:50051',
                                       grpc.credentials.createInsecure());
  var user;
  client.syncData({input: "blah"}, function(err, response) {
    console.log('Status:', response.status);
  });
}

main();
