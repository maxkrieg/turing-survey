// BASE SETUP /////////////////////////////////////////////////////

// EXPRESS
var express = require('express');

// MONGOOSE & MONGODB
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/turingdb');

var MongoURI = 'mongodb://localhost/turingdb';
mongoose.connect(MongoURI, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('MongoDB connected successfully to ' + MongoURI);
  }
});

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var methodOverride = require('method-override');
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

// PASSPORT
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// ROUTES
var authRoutes = require('./routes/auth');
var appRoutes = require('./routes/app-routes');
var apiRoutes = require('./routes/api-routes');
var homeRoutes = require('./routes/index');

// SCHEMA
var Question = require('./lib/question.js');
var Survey = require('./lib/surveys.js');

// STYLUS AND NIB CONFIG: Compile Func
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

// CONFIGURATION /////////////////////////////////////////////////////////////////////////

// PASSPORT
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use(session({
  store: new MongoStore({
    url: MongoURI
  }),
  secret: 'learn node',
  resave: true,
  saveUninitialized: false
}));




app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

// USER
var User = require('./lib/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Express & Stylus Compile
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
