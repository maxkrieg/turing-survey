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

questionSchema.virtual('calculatedResult').get(function() {
  var responsesArray = this.responses;
  var arrayLength = responsesArray.length;
  var result;

  if (this.type === "Scale") {
    var sum = responsesArray.map(function(num) {
      return parseInt(num, 10);
    }).reduce(function(a, b) {
      return (a + b);
    });
    result = Math.round((sum / arrayLength));
  } else if (this.type === "Multiple Choice") {
    var wordCounts = {};
    responsesArray.forEach(function(word) {
      if (wordCounts[word] === undefined) {
        wordCounts[word] = 0;
      }
      wordCounts[word] += 1;
    });
    result = wordCounts;
  } else if (this.type === "Text") {
    result = responsesArray;
  }
  return result;
});

//////////////////////////////////////////////
var Question = mongoose.model('Question', questionSchema);
module.exports = Question;
