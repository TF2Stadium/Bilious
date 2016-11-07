require('./setup');

var createServer = require('../src/server').createServer,
  connectDb = require('../src/db').connect;

connectDb().then(
  function (dbConnection) {
    createServer(dbConnection);
  },
  function (err) {
    console.error('Connecting to DB: ', err);
  }
);
