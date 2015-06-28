$(document).ready(function() {

  // Hide the edit-question form by default
  $('.edit-question-form').hide();

  // Delete a survey
  $('.delete-survey').on('click', function(e) {
    e.preventDefault();
    var surveyId = $(this).attr('data-id');
    var $thisButton = $(this);

    $.ajax({
      url: '/surveys/' + surveyId,
      type: 'DELETE'
    }).done(function() {
      console.log('success deleting survey');
      $thisButton.parents('.list-group-item').remove();
    }).fail(function() {
      console.log("error DELETING SURVEY");
    });

  });

  // Toggle hide and show of edit-question form
  $('.edit-question').on('click', function(e) {
    e.preventDefault();
    $('.edit-question-form').hide();
    var questionId = $(this).attr('data-id');
    $('[data-question="' + questionId + '"]').show();
    console.log($(this));

    var legacyType = $(this).parents('.list-group-item').find('.edit-type-select option:selected').text();
    console.log(legacyType);

    // Hides or Shows based on legacy question type
    var renderInputs = function(questionType) {
      if (questionType === "Multiple Choice") {
        $('.scale').hide();
        $('.text').hide();
        $('.multiple-choice').show();
      } else if (questionType === "Scale") {
        $('.multiple-choice').hide();
        $('.text').hide();
        $('.scale').show();
      } else if (questionType === "Text") {
        $('.multiple-choice').hide();
        $('.scale').hide();
        $('.text').show();
      }
    };
    renderInputs(legacyType);

    // Hides or shows based on newly selected question type
    var thisSelector = $(this).parents('.list-group-item').find('.edit-type-select');
    $(thisSelector)
      .change(function() {
        var selectedType = "";
        $(this).parents('.list-group-item').find('.edit-type-select option:selected').each(function() {
          selectedType += $(this).text();
        });
        console.log(selectedType);
        renderInputs(selectedType);
      });

  });

  // PUT changes to question
  // remember to include the _id when sending back the JSON object

  $('.edit-question-save').on('click', function() {
    var surveyId = $('h2').attr('id');
    var questionId = $(this).attr('data-question-id');
    var title = $(this).parents('.list-group-item').find('#edit-question-title').val();
    var helpText = $(this).parents('.list-group-item').find('#edit-question-helptext').val();
    var type = $(this).parents('.list-group-item').find('.edit-type-select option:selected').text();
    var choices = [];
    if (type === "Multiple Choice") {
      $(this).parents('.list-group-item').find('.multiple-choice-option').each(function(index) {
        choices.push($(this).val());
      });
    }
    var responses = [];
    var url = '/surveys/' + surveyId + '/questions/' + questionId;
    var question = {
      _id: questionId,
      title: title,
      helpText: helpText,
      type: type,
      choices: choices,
      responses: responses
    };

    $.ajax({
      method: 'PUT',
      url: url,
      data: JSON.stringify(question),
      contentType: "application/json; charset=utf-8"
    }).done(function() {
      console.log("success updating question");
    }).fail(function() {
      console.log("error updating question");
    });
  });

  $('.edit-question-cancel').on('click', function() {
    $('.edit-question-form').hide();
  });


  // Delete a Question from Survey
  $('.delete-question').on('click', function(e) {
    e.preventDefault();
    var surveyId = $('h2').attr('id');
    var questionId = $(this).attr('data-id');
    var $thisButton = $(this);

    $.ajax({
      url: '/surveys/' + surveyId + '/questions/' + questionId,
      type: 'DELETE'
    }).done(function() {
      console.log('success deleting question');
      $thisButton.parents('.list-group-item').remove();
    }).fail(function() {
      console.log("error DELETING question");
    });

  });


});
