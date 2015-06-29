// BASE SETUP /////////////////////////////////////////////////////

// MONGOOSE & MONGODB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turingdb');

// EXPRESS
var express = require('express');
// Create instance of an express application
var app = express();

// BODY-PARSER
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// JADE
var jade = require('jade');
var fs = require('fs');
// we set our view engine here
app.set('view engine', 'jade');
app.set('views', './templates');

// STYLUS
var stylus = require('stylus');
var nib = require('nib');

//PASSPORT
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// IMPORT SCHEMA
var User = require('./lib/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var Question = require('./lib/question.js');
var Survey = require('./lib/surveys.js');


// IMPORT ROUTES
var authRoutes = require('./routes/auth');
var appRoutes = require('./routes/app-routes');
var apiRoutes = require('./routes/api-routes');
var homeRoutes = require('./routes/index');


// STYLUS AND NIB CONFIG
// creates compile func, calls stylus & nib middlewear in stack
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
};

//PASSPORT SHIT
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join('./public', 'public')));


// set up express to use stylus middlewear and pass in compile function as object
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(__dirname + '/public'));

// ROUTE MOUNTING
app.use('/auth', authRoutes);
app.use('/surveys', appRoutes);
app.use('/api/surveys', apiRoutes);
app.use('/', homeRoutes);


// SERVER /////////////////////////////////////////////////////////

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Magical Team Turing survey app listening at http://%s:%s", host, port);
});
