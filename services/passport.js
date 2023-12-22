
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

const keys = require('../config/keys');

// pulling user model class from mongodb
const User = mongoose.model('users'); // without second argument as creating new user model class

// define authentication strategy to be used
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => { // the arrow function called when authentication completed by passport
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);
      // console.log('done', done);
      User.findOne({ googleId: profile.id })  // return a promise, need to follow up with 'then' callback function
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser); // done with existing user found
          } else {
            const user = new User({
              googleId: profile.id
            });

            user.save() // return a promise, need to follow up with 'then' callback function
              .then(user => {
                done(null, user); // the user got back from database after it was successfully saved
              })
          }
        }) 
    }
  )
);


// define how to send user info back
passport.serializeUser((user, done) => {
  done(null, user.id); // using internally assigned id by mongodb of the user model instance (aka document id)
});

// define how to restore user instance from its id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});