const express = require('express'); // using common js instead of es 2015
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');

// establish cosmos db connection
mongoose.connect(keys.mongoURI);
require('./models/Users'); // execute user model class creating code

// need to execute after loading user model class
require('./services/passport'); // execute passport.use() method

const app = express(); // create a new app, express can support multiple apps

// wire up middlewares to pre-process incoming requests before passing them to route handers

// enable cookie for the application
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    keys: [keys.cookieKey]
  })
);

// tell passport to use session to manage authentication
app.use(passport.initialize());
app.use(passport.session());

// route handlers
require('./routes/authRoutes')(app); // register auth handlers

// sample route handlers
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
// for dev env: npm run dev (see package.json for "dev" scrip)