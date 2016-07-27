let User = require('../models/User.js');

module.exports = function(express, passport) {
  let routes = express.Router();

  routes.post('/auth/local',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login.html'
    })
  );

  routes.post('/auth/local/register', (req, res) => {
    User.findByEmail(req.body.email).then(user => {
      if (user) {
        res.redirect('/register.html?error');
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }).then(user => {
          res.redirect('/login.html?success');
        });
      }
    });
  });

  routes.get('/auth/facebook', passport.authenticate('facebook'));

  routes.get('/auth/facebook/return',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login.html'
    })
  );

  routes.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login.html');
    });
  });

  return routes;
};
