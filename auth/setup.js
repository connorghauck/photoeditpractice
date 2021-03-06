const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

//const config = require('module');
const User = require('../models/user');

exports.setup = function () {

  passport.use(new GoogleStrategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    clientID: '635146343171-m726t7cjr75thvph68au09l2upao1tjk.apps.googleusercontent.com',
    clientSecret: 'E3mabZbBKqq4ETbNjvJUyn7_',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },

  function (accessToken, refreshToken, profile, cb) {

    findOrCreate(profile.id, profile.email, profile.displayName, accessToken, refreshToken, function (err, user) {
      return cb(err, user);
    });
  }
));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {

  done(null, user.googleid);

});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    done(err);
  });
});

};


function findOrCreate(googleID, googleEmail, googleName, accessToken, refreshToken, done) {

    console.log('googleID', googleID);

    User.findById(googleID, googleEmail, googleName, accessToken, refreshToken).then(function (user) {
      console.log('user', user);
      if (user) {
          // update access and refresh token
          User.updateTokens(googleID, googleEmail, googleName, accessToken, refreshToken);
            console.log('update user', user);
                  return done(null, user);

      }


      if (!user) {
        console.log('inside!user');
        User.create(googleID, googleEmail, googleName, accessToken, refreshToken).then(function (user) {
          console.log('create user', user);
          return done(null, user);
        });
      };
    });
  }
