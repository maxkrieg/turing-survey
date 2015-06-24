var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
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



apiRouter.post('/', jsonParser);
apiRouter.post('/', function(req, res) {
  Survey.create(req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

apiRouter.put('/:id', jsonParser);
apiRouter.put('/:id', function(req, res) {
  Survey.findByIdAndUpdate(req.params.id, req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

apiRouter.delete('/:id', function(req, res) {
  Survey.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});


apiRouter.get('/:id/questions/:question_id', function(req, res) {
  Survey.find({
    _id: req.params.id
  }, {
    questions: {
      $elemMatch: {
        _id: req.params.question_id
      }
    }
  }, function(err, question) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(question);
  });
});

apiRouter.post('/:id/questions/', jsonParser);
apiRouter.post('/:id/questions/', function(req, res) {
  var survey = Survey.find({
    _id: req.params.id
  });
  survey.questions.push(req.body);
  if (err) {
    console.log(err);
    res.sendStatus(400);
  }
  res.sendStatus(201);
});




//////////////////////////////////////////
module.exports = apiRouter;
