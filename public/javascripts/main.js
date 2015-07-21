$(document).ready(function() {

  // DELETE A SURVEY //////////////////////////////////////////////////////////////////////

  // EDIT SURVEY  //////////////////////////////////////////////////////////////////////////

  // EDIT QUESTION ////////////////////////////////////////////////////////////////////////////

  // Hide edit-question form by default
  $('.edit-question-form').hide();

  // Hide edit question form on cancel button click
  $('.edit-question-cancel').on('click', function() {
    $('.edit-question-form').hide();
  });

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

  // Toggle hide and show of edit-question form
  $('.edit-question').on('click', function(e) {
    e.preventDefault();
    $('.edit-question-form').hide();
    var questionId = $(this).attr('data-id');
    $('[data-question="' + questionId + '"]').show();

    var legacyType = $(this).parents('.list-group-item').find('.edit-type-select option:selected').text();

    renderInputs(legacyType);

    // Hides or shows based on newly selected question type
    var thisSelector = $(this).parents('.list-group-item').find('.edit-type-select');
    $(thisSelector)
      .change(function() {
        var selectedType = "";
        $(this).parents('.list-group-item').find('.edit-type-select option:selected').each(function() {
          selectedType += $(this).text();
        });
        renderInputs(selectedType);
      });
  });

  // PUT changes to question
  $('.edit-question-save').on('click', function(e) {
    e.preventDefault();

    // Find IDs for URL
    var surveyId = $('h2').attr('id');
    var questionId = $(this).attr('data-question-id');

    // Create Question Object
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

    // PUT Question
    $.ajax({
      method: 'PUT',
      url: url,
      data: JSON.stringify(question),
      contentType: "application/json; charset=utf-8"
    }).done(function() {
      console.log("success updating question");
      $('.edit-question-form').hide();
    }).fail(function() {
      console.log("error updating question");
    });
  });



  // DELETE A QUESTION /////////////////////////////////////////////////////////////////
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

  // CREATE SURVEY /////////////////////////////////////////////////////////////////////////////

  // Hides or show input options based on question type
  $('.new-questions-list').on('change', '.new-question-type', function() {
    var selectedType = "";
    $('.new-question-type option:selected').each(function() {
      selectedType += $(this).text();
    });
    renderInputs(selectedType);
  }).change();

  // POST Request for Question ///////////////////////////////////////////////
  $('.new-questions-list').on('click', '.new-question-save', function() {
    // grab question values
    var title = $('#new-question-title').val();
    var helpText = $('#new-question-helptext').val();
    var type = $('.new-question-type option:selected').text();
    var choices = [];
    if (type === "Multiple Choice") {
      $(this).parents('.list-group-item').find('.multiple-choice-option').each(function(index) {
        choices.push($(this).val());
      });
    }
    var surveyId = $('#new-question-form').attr('data-survey-id');
    console.log(surveyId);

    var question = {
      title: title,
      helpText: helpText,
      type: type,
      choices: choices
    };

    $.ajax({
      method: 'POST',
      url: '/surveys/' + surveyId + '/questions',
      data: JSON.stringify(question),
      contentType: "application/json; charset=utf-8"
    }).done(function(response) {
      console.log('success POSTing question');
      $('.new-questions-list').prepend(response);
      $('#new-question-title').val('');
      $('#new-question-helptext').val('');
      $('.multiple-choice-option').each(function(index) {
        $(this).val('');
      });
    }).fail(function() {
      console.log('error POSTing new question');
    });
  });



  // TAKE SURVEY ////////////////////////////////////////////////////////////////////////////

  // Hide all but first question on initial survey view
  $('#survey-questions').children('.view-survey-question').hide();
  $('#survey-questions, .view-survey-question:first-child').show();

  $('.radio-button').on('click', function() {
    $('.radio-button').removeClass('selected-radio');
    $(this).addClass('selected-radio');
  });

  // POST answer to each question
  $('.next-question, .submit-survey-guest').on('click', function(e) {
    e.preventDefault();
    var questionType = $('#take-question-title').attr('data-type');
    var response = '';

    // Getting proper type of response
    if (questionType === 'Multiple Choice') {
      response = $('.selected-radio').val();
    } else if (questionType === 'Scale') {
      response = $(this).parents('.list-group-item').find('.scale-response option:selected').text();
    } else if (questionType === 'Text') {
      response = $('#text-response').val();
    }

    // Forming URL and response object
    var surveyId = $('#take-survey-title').attr('data-survey-id');
    var questionId = $('#take-question-title').attr('data-question-id');
    var url = '/surveys/' + surveyId + '/questions/' + questionId + '/response';
    var responseObject = {
      response: response
    };

    // PUT repsonse
    $.ajax({
      method: 'PUT',
      url: url,
      data: JSON.stringify(responseObject),
      contentType: "application/json; charset=utf-8"
    }).done(function() {
      console.log("success submitting answer");
    }).fail(function() {
      console.log("error updating question");
    });

    $(this).parents('.list-group-item').remove();
    $('#survey-questions, .view-survey-question:first-child').show();

  });

}); /* Closing for document.ready */
