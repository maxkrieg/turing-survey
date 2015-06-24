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
// SAMPLE Import of Routes
// var surveys = require('./routes/surveys');
var apiRoutes = require('./routes/api-routes');

// SAMPLE Middleware Mounting for Routes
// app.use('/surveys', surveys);
app.use('/api/surveys', apiRoutes);



// SERVER /////////////////////////////////////////////////////////

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
