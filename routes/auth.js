var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var appRouter = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../lib/user.js');
