let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;

let User = require('../models/User');
let OAuth = require('../models/OAuth');

passport.use(new LocalStrategy({
  usernameField: 'username'
}, function(name, password, done) {
  User.findOne({where:{name: name}}).then(user => {
    console.log('auth user', user);
    if (!user) {
      console.error('user does not exist in the database');
      done(null, false);
    } else {
      user.verifyPassword(password).then(verified => {
        if (verified) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: '/auth/facebook/return'
}, function(accessToken, refreshToken, profile, done) {
    // what if user exists in user table
    // but first time logging in with fb?
    // current logic would create a duplicate user in user table
    OAuth.findOne({where: {
      oauthId: profile.id,
      oauthType: 'facebook'
    }})
    .then(oauth => {
      if (!oauth) {
        User.create({
          name: profile.displayName,
          email: 'na',   // ???
          password: 'na' // ???
        })
        .then((user) => {
          OAuth.create({
            oauthId: profile.id,
            oauthType: profile.provider,
            userId: user.id
          });
          done(null, user);
        });
      } else {
        User.findOne({where: {
          id: oauth.userId
        }})
        .then(user => {
          done(null, user);
        });
      }
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

function isAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login.html');
  }
}

module.exports = {
  passport,
  isAuth
};
