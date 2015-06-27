var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var appRouter = express.Router();
var Survey = require('../lib/surveys.js');
var util = require('util');
//////////////////////////////////////////

// SURVEY ROUTES

// View survey list: dashboard.jade
appRouter.get('/', function(req, res) {
  Survey.find({}, function(err, surveyList) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.render('dashboard', {
      surveys: surveyList
    });
  });
});

// View the template to create a new survey
appRouter.get('/create', function(req, res) {
  res.render('create-survey');
});

// View survey results
appRouter.get('/:id/results', function(req, res) {
  Survey.findOne({
    _id: req.params.id
  }, function(err, survey) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.render('view-results', {
      survey: survey
    });
  });
});

// View specific Survey as Guest: url-survey.jade
appRouter.get('/:id/guest', function(req, res) {
  Survey.findOne({
    _id: req.params.id
  }, function(err, survey) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.render('url-survey', {
      survey: survey
    });
  });
});

// View specific Survey as User: edit-survey.jade
appRouter.get('/:id', function(req, res) {
  Survey.findOne({
    _id: req.params.id
  }, function(err, survey) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.render('edit-survey', {
      survey: survey
    });
  });
});


// Create new survey: survey.jade
appRouter.post('/', jsonParser);
appRouter.post('/', function(req, res) {
  Survey.create(req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      // This will take the newly created survey and fill in the survey.jade template
      fs.readFile('./templates/create-survey.jade', 'utf8', function(err, data) {
        if (err) {
          res.sendStatus(400);
        }
        var surveyCompiler = jade.compile(data);
        var html = surveyCompiler(survey);
        // This sends the filled in survey template back to client
        res.send(html);
        res.status(201);
      });
    }
  });
});

// Update specific survey
appRouter.put('/:id', jsonParser);
appRouter.put('/:id', function(req, res) {
  Survey.findByIdAndUpdate(req.params.id, req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete specific survey
appRouter.delete('/:id', function(req, res) {
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

// appRouter.get('/:id/questions/:question_id', function(req, res) {
//   Survey.find({
//     _id: req.params.id
//   }, {
//     questions: {
//       $elemMatch: {
//         _id: req.params.question_id
//       }
//     }
//   }, function(err, question) {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     }
//     res.json(question);
//   });
// });

// Create new question: question.jade
appRouter.post('/:id/questions/', jsonParser);
appRouter.post('/:id/questions/', function(req, res) {
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
    } else {
      // This will take the newly created question and fill in the question.jade template
      fs.readFile('./templates/question.jade', 'utf8', function(err, data) {
        if (err) {
          res.sendStatus(400);
        }
        var questionCompiler = jade.compile(data);
        var html = questionCompiler(question);
        // This sends the filled in question template back to client
        res.send(html);
        res.status(201);
      });
    }
  });
});

// Update specific question
appRouter.put('/:id/questions/:question_id', jsonParser);
appRouter.put('/:id/questions/:question_id', function(req, res) {
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

// Delete specific question
appRouter.delete('/:id/questions/:question_id', function(req, res) {
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
module.exports = appRouter;
