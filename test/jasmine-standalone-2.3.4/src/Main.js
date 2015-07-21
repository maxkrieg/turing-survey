var renderInputs = function(questionType) {
  var type;
  if (questionType === "Multiple Choice") {
    type = 'mchoice';
  } else if (questionType === "Scale") {
    type = 'scale';
  } else if (questionType === "Text") {
    type = 'text';
  }
  return type;
};
