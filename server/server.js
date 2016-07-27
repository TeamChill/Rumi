let http = require('http');
let express = require('express');
let app = express();
let server = http.Server(app);

let sessionMW = require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});

checkForEnvironmentVariables(['FB_ID', 'FB_SECRET', 'SESSION_SECRET']);

require('./config/middleware')(app, express, sessionMW);
require('./config/socketRouter')(server, sessionMW);

module.exports = server;

function checkForEnvironmentVariables(arr) {
  arr.forEach(v => {
    if (!process.env[v]) {
      throw new Error(`environment variable ${v} not defined`);
    }
  });
};
