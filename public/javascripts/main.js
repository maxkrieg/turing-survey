$(document).ready(function() {

  // DASHBOARD VIEW ////////////////////////////////////////////////////////////////////////////

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
  // EDIT SURVEY VIEW ////////////////////////////////////////////////////////////////////////////

  $('.edit-survey-submit').on('click', function(e) {
    e.preventDefault();
    var title = $('#survey-title').val();
    var description = $('#survey-description').val();
    var surveyId = $('h2').attr('id');
    var url = '/surveys/' + surveyId;

    var survey = {
      title: title,
      description: description
    };

    $.ajax({
      method: 'PUT',
      url: url,
      data: JSON.stringify(survey),
      contentType: "application/json; charset=utf-8"
    }).done(function() {
      console.log("success updating survey");
    }).fail(function() {
      console.log("error updating survey");
    });

  });

  // EDIT QUESTION ////////////////////////////////////////////////////////////////////////////

  // Hide the edit-question form by default
  $('.edit-question-form').hide();

  // Toggle hide and show of edit-question form
  $('.edit-question').on('click', function(e) {
    e.preventDefault();
    $('.edit-question-form').hide();
    var questionId = $(this).attr('data-id');
    $('[data-question="' + questionId + '"]').show();

    var legacyType = $(this).parents('.list-group-item').find('.edit-type-select option:selected').text();

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

  // TAKE SURVEY ////////////////////////////////////////////////////////////////////////////
  $('#survey-questions').children('.view-survey-question').hide();
  $('#survey-questions .view-survey-question:first-child').show();

  $('.next-question, .submit-survey-guest').on('click', function(e) {
    e.preventDefault();
    var questionType = $('#question-title').attr('data-type');
    console.log('submitted type: ' + questionType);
    var response = '';

    if (questionType === 'Multiple Choice') {
      // response = value of radio button
    } else if (questionType === 'Scale') {
      response = $(this).parents('.list-group-item').find('.scale-response option:selected').text();
    } else if (questionType === 'Text') {
      response = $('#text-response').val();
    }

    // $.ajax({
    //   method: 'POST',
    //   url: 'http://localhost:3000/contacts',
    //   data: JSON.stringify(contact),
    //   contentType: "application/json; charset=utf-8"
    // }).done(function(response) {
    //   console.log('success POSTing question response');
    //   $('.contacts').append(response);
    // }).fail(function() {
    //   console.log('error POSTing question response');
    // });



    $(this).parents('.list-group-item').remove();
    $('#survey-questions .view-survey-question:first-child').show();




  });


});
