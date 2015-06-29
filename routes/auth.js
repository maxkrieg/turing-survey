var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var authRouter = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../lib/user.js');
//////////////////////////////////////////

//INDEX/HOME ROUTE
authRouter.get('/', function(req, res) {
  res.render('index');
});

//REGISTER ROUTES

authRouter.get('/register', function(req, res) {
    res.render('register', {});
});

authRouter.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/surveys/' + req.user.username);
        });
    });
});

//LOGIN ROUTES

authRouter.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

authRouter.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/surveys/' + req.user.username);
});

//LOGOUT ROUTES

authRouter.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//////////////////////////////////////////
module.exports = authRouter;
