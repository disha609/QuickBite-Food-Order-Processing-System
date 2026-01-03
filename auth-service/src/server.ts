import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { AuthService } from './auth.service';

const PROTO_PATH = path.join(__dirname, '../grpc/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth as any;

const authService = new AuthService();

function register(call: any, callback: any) {
  const { username, password } = call.request;
  authService.register(username, password)
    .then(res => callback(null, res))
    .catch(err => callback(err));
}

function login(call: any, callback: any) {
  const { username, password } = call.request;
  authService.login(username, password)
    .then(res => callback(null, res))
    .catch(err => callback(err));
}

function main() {
  const server = new grpc.Server();
  server.addService(authProto.AuthService.service, { register, login });
  const addr = '0.0.0.0:50051';
  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Auth gRPC server running at ${addr}`);
    server.start();
  });
}

main();
