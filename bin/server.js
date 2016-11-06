require('./setup');

var server = require('../src/server'),
  connectDb = require('../src/db').connect;

server(connectDb);
