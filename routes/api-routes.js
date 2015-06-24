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
  })
})




//////////////////////////////////////////
module.exports = apiRouter;
