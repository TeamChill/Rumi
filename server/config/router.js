let User = require('../models/User.js');
let jwt = require('jsonwebtoken');

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

  routes.post('/iosAuth/local/signin', function(req, res) {
    User.findByEmail(req.body.email).then(user => {
      if (!user) {
        console.error('user does not exist in the database');
        res.json({message: 'User does not exist'});
      } else {
        user.verifyPassword(req.body.password).then(verified => {
          if (verified) {
            var tokenUser = {id: user.id, email: user.email, name: user.name};
            var token = jwt.sign(tokenUser, 'helloguys', {expiresIn: 1000});
            console.log(token);
            res.status(201).send({
              id_token: token,
              name: user.name,
              id: user.id
            });
          } else {
            res.json({message: 'Password incorrect'});
          }
        });
      }
    });
  });

  routes.post('/iosAuth/local/signup', (req, res) => {
    User.findByEmail(req.body.email).then(user => {
      if (user) {
        console.log('Username is taken');
        res.json({message: 'Username is taken...'});
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }).then(user => {
          var tokenUser = {id: user.id, email: user.email, name: user.name};
          var token = jwt.sign(tokenUser, 'helloguys', {expiresIn: 1000});
          console.log(token);
          res.status(201).send({
            id_token: token,
            name: user.name,
            id: user.id
          });
        });
      }
    });
  });

  // routes.get('/logout', (req, res) => {
  //   req.session.destroy(() => {
  //     res.redirect('/login.html');
  //   });
  // });

  return routes;
};
