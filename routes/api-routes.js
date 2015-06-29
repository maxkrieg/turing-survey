var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var apiRouter = express.Router();
var Question = require('../lib/question.js');
var Survey = require('../lib/surveys.js');

//////////////////////////////////////////

// SURVEY ROUTES

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

// QUESTION ROUTES

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
  Survey.update({
    _id: req.params.id,
  }, {
    $push: {
      questions: req.body
    }
  }, function(err, question) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log(question);
    res.sendStatus(201);
  });
});

apiRouter.put('/:id/questions/:question_id', jsonParser);
apiRouter.put('/:id/questions/:question_id', function(req, res) {
  Survey.update({
    _id: req.params.id,
    'questions._id': req.params.question_id
  }, {
    $set: {
      'questions.$': req.body
    }
  }, function(err, question) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('updated question');
    res.sendStatus(200);
  });
});

// Insert Response in Question response array
apiRouter.put('/:id/questions/:question_id/response', jsonParser);
apiRouter.put('/:id/questions/:question_id/response', function(req, res) {
  Survey.update({
    _id: req.params.id,
    'questions._id': req.params.question_id
  }, {
    $push: {
      'responses.$': req.body
    }
  }, function(err, answer) {
    if (err) {
      console.log(answer);
      console.log(err);
      res.sendStatus(400);
    }
    console.log('inserted answer');
    console.log(answer);
    res.sendStatus(200);
  });
});


// TEST: Get Question
apiRouter.put('/:id', function(req, res) {
  Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(question);
  });
});



apiRouter.delete('/:id/questions/:question_id', function(req, res) {
  Survey.update({
    _id: req.params.id,
  }, {
    $pull: {
      questions: {
        _id: req.params.question_id
      }
    }
  }, function(err, question) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('question deleted');
    res.sendStatus(204);
  });
});

//////////////////////////////////////////
module.exports = apiRouter;
