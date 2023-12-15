const passport = require('passport');

module.exports = (app) => {
  // handler for google oauth with scope of user's profile and email
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // handler for google oauth callback, the returned authenticated code will be extracted by passport framework
  app.get('/auth/google/callback', passport.authenticate('google'));
}