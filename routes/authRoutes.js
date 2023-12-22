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

  // handler for user logout
  app.get('/api/logout', (req, res) => {
    req.logout(); // indicate the req is logged out
    res.send(req.user); // invalidate the user
  })

  app.get('/api/current_user', (req, res) => {
    // for understanding cookie session
    // res.send(req.session); // cookie session extract cookie data and attach it to req.session

    // actual code
    res.send(req.user); // the user is embeded by passport after cookie-session extract user.id out of cookie
  });
}