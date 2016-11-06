require('./setup');

var createServer = require('../src/server').createServer,
  connectDb = require('../src/db').connect;

createServer(connectDb);
