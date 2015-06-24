var express = require('express');
var apiRouter = express.Router();
var Survey = require('../lib/surveys.js');
//////////////////////////////////////////

apiRouter.get('/', function(req, res) {
  Survey.find({}, function(err, surveyList) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(surveyList);
  });
});

apiRouter.get('/:id', function(req, res) {
  Survey.find({
    _id: req.params.id
  }, function(err, survey) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(survey);
  });
});




//////////////////////////////////////////
module.exports = apiRouter;
