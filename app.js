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

// IMPORT SCHEMA
var Survey = require('./lib/surveys.js');

// IMPORT ROUTES
var appRoutes = require('./routes/app-routes');
var apiRoutes = require('./routes/api-routes');

// Middleware Mounting for Routes
app.use('/surveys', appRoutes);
app.use('/api/surveys', apiRoutes);



// SERVER /////////////////////////////////////////////////////////

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Magical Team Turing survey app listening at http://%s:%s", host, port);
});
