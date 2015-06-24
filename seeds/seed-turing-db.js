var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turingdb');

var Survey = require('../lib/surveys.js');

var removeSurveys = function(done) {
  Survey.remove({}, done);
};

var createClassSurvey = function(done) {
  Survey.create({
    title: 'WDI Class Survey',
    date: '06/24/2015',
    description: 'This is a survey designed to gauge understanding among students in WDI course.',
    questions: [{
      title: 'How well do you understand Node.js?',
      helpText: 'Simply answer how you feel today on a scale of 1-5.',
      type: 'Scale',
      choices: [1, 2, 3, 4, 5],
      responses: []
    }, {
      title: 'What do you want for outcomes lunch?',
      helpText: 'Choose one of the following choices.',
      type: 'Multiple Choice',
      choices: ['Naanwiches', 'Pizza', 'Salad', 'Waffles', 'Burritos'],
      responses: []
    }, {
      title: 'What would you improve about the WDI course?',
      helpText: 'Simply answer how you feel today on a scale of 1-5.',
      type: 'Text',
      responses: []
    }]
  }, done)
};

async.series([
  removeSurveys,
  createClassSurvey
], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
