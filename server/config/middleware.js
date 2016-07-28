let bodyParser = require('body-parser');
let auth = require('./auth');
let routes = require('./router');

module.exports = function(app, express, sessionMW) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(sessionMW);
  app.use(auth.passport.initialize());
  app.use(auth.passport.session());

  app.use(routes(express, auth.passport));
  app.use(express.static(__dirname + '/../../public'));
  app.use(auth.isAuth, express.static(__dirname + '/../../dist'));
};

