var mongoose = require('mongoose');
//////////////////////////////////////////////

var enumeratedQuestionTypes = ['Multiple Choice', 'Scale', 'Text'];

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  helpText: String,
  type: {
    type: String,
    required: true,
    enum: {
      values: enumeratedQuestionTypes
    }
  },
  choices: [],
  responses: []
});

//////////////////////////////////////////////
var Question = mongoose.model('Question', questionSchema);
module.exports = Question;
