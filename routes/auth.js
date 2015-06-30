var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var User = require('../lib/user.js');
//////////////////////////////////////////

//LOGOUT ROUTES
authRouter.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

//REGISTER ROUTES
authRouter.get('/register', function(req, res) {
  res.render('register', {});
});

authRouter.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', {
        user: user
      });
    }

    passport.authenticate('local')(req, res, function() {
      res.redirect('/surveys');
    });
  });
});

//LOGIN ROUTES
authRouter.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

authRouter.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/surveys');
});

//////////////////////////////////////////
module.exports = authRouter;
