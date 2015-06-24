// BASE SETUP /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

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
var Contact = require('./lib/contacts.js');
var Article = require('./lib/articles.js');

// IMPORT ROUTES
// SAMPLE Import of Routes
var routes = require('./routes/index');
var contacts = require('./routes/contacts');
var auth = require('./routes/auth');
var apiContacts = require('./routes/api-routes');

// SAMPLE Middleware Mounting for Routes
app.use('/', routes);
app.use('/contacts/', contacts);
app.use('/auth/', auth);
app.user('/api/contacts', apiContacts);
