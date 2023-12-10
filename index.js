const express = require('express'); // using common js instead of es 2015

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express(); // create a new app, express can support multiple apps
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, 
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

// define route handlers

/*
// simplest test route
app.get('/', (req, res) => { // http get method for route of context root /
  res.send({ bye: 'buddy'});
});
/**/ 

// start the app and listening to the port
const PORT = process.env.PORT || 5000; // the port number is 5000 or will be injected from environment settings by hosting

app.listen(PORT); // localhost:5000 or render provided URL https://umaily.onrender.com

// node index.js or check start script in the package.json file