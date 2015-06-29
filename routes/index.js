var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var homeRouter = express.Router();
//////////////////////////////////////////

homeRouter.get('/', function(req, res) {
  if(!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  res.render('index', {
    title: 'Express',
    user: req.user,
    views: req.session.views
  });
});

//////////////////////////////////////////
module.exports = homeRouter;
