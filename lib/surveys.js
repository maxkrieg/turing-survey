var mongoose = require('mongoose');
var questionSchema = require('./question.js');
//////////////////////////////////////////////

var surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: String,
  description: String,
  questions: [questionSchema.schema]
});


//////////////////////////////////////////////
var Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
