var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turingdb');
var Question = require('../lib/question.js');
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
      responses: [2, 3, 4, 3, 1, 1, 3, 4, 5, 2, 4]
    }, {
      title: 'What do you want for outcomes lunch?',
      helpText: 'Choose one of the following choices.',
      type: 'Multiple Choice',
      choices: ['Naanwiches', 'Pizza', 'Salad', 'Waffles', 'Burritos'],
      responses: ['Pizza', 'Naanwiches', 'Waffles', 'Waffles', 'Burritos', 'Burritos', 'Salad', 'Pizza', 'Salad']
    }, {
      title: 'What is your favorite language?',
      helpText: 'Please write in the text box below.',
      type: 'Text',
      responses: ['This is sample text for one answer. It really doesn\'t mean anything', 'Sample text for another text answer two.  This also doesnt mean anything.', 'Answer three sample text.  This is the shortest and lamest answer by far.']
    }]
  }, done);
};

var createWorkSurvey = function(done) {
  Survey.create({
    title: 'iProspect Team Survey',
    date: '06/26/2015',
    description: 'This survey will help iProspect better understand their employees.',
    questions: [{
      title: 'Do you feel comfortable approaching senior leadership?',
      helpText: 'Answer how you feel today on a scale of 1-5. An answer of "5" means that you are very comfortable.',
      type: 'Scale',
      choices: [1, 2, 3, 4, 5],
      responses: [2, 3, 4, 3, 1, 1, 3, 4, 5, 2, 4]
    }, {
      title: 'What is the greatest challenge you face on a daily basis?',
      helpText: 'Choose one of the following choices.',
      type: 'Multiple Choice',
      choices: ['Choosing lunch', 'Reporting', 'Strategy', 'Client relationship', 'Emailing'],
      responses: ['Emailing', 'Reporting', 'Strategy', 'Strategy', 'Client relationship', 'Client relationship', 'Choosing lunch', 'Emailing', 'Choosing lunch']
    }, {
      title: 'If you could change one thing about iProspect what would it be?',
      helpText: 'Please write in the text box below.',
      type: 'Text',
      responses: ['This is sample text for one answer. It really doesn\'t mean anything', 'Sample text for another text answer two.  This also doesnt mean anything.', 'Answer three sample text.  This is the shortest and lamest answer by far.']
    }]
  }, done);
};

async.series([
  removeSurveys,
  createClassSurvey,
  createWorkSurvey
], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
