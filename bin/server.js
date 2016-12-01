require('./setup');

var createServer = require('../src/server').createServer,
  connectDb = require('../src/db').connect;

connectDb().then(
  function (dbConnection) {
    try {
      createServer(dbConnection);
    } catch (e) {
      console.error(e);
    }
  },
  function (err) {
    console.error('Connecting to DB: ', err);
  }
);
