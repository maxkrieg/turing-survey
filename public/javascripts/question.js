var TuringSurvey = TuringSurvey || {};

TuringSurvey.Question = {

  renderInputs: function(questionType) {
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
  },

  hideEditQuestionForm: function() {
    // Hide edit-question form by default
    $('.edit-question-form').hide();

    // Hide edit question form on cancel button click
    $('.edit-question-cancel').on('click', function() {
      $('.edit-question-form').hide();
    });
  },

  editQuestionForm: function() {
    $('.edit-question').on('click', function(e) {
      e.preventDefault();
      $('.edit-question-form').hide();
      var questionId = $(this).attr('data-id');
      $('[data-question="' + questionId + '"]').show();

      // Gets legacy question type to display values
      var legacyType = $(this).parents('.list-group-item').find('.edit-type-select option:selected').text();
      TuringSurvey.Question.renderInputs(legacyType);

      // Gets new question type to display values
      var thisSelector = $(this).parents('.list-group-item').find('.edit-type-select');
      $(thisSelector)
        .change(function() {
          var selectedType = "";
          $(this).parents('.list-group-item').find('.edit-type-select option:selected').each(function() {
            selectedType += $(this).text();
          });
          TuringSurvey.Question.renderInputs(selectedType);
        });
    });
  },

  createQuestionForm: function() {
    $('.new-questions-list').on('change', '.new-question-type', function() {
      var selectedType = "";
      $('.new-question-type option:selected').each(function() {
        selectedType += $(this).text();
      });
      TuringSurvey.Question.renderInputs(selectedType);
    }).change();
  },


  editQuestionSubmit: function() {
    $('.edit-question-save').on('click', function(e) {
      e.preventDefault();

      // Find IDs for URL
      var surveyId = $('h2').attr('id');
      var questionId = $(this).attr('data-question-id');

      // Get Values for Question Object
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

      // Create URL
      var url = '/surveys/' + surveyId + '/questions/' + questionId;

      // Create Question object
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
  },

  deleteQuestionSubmit: function() {
    $('.delete-question').on('click', function(e) {
      e.preventDefault();

      // Get values for URL
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
  },

  createQuestionSubmit: function() {
    $('.new-questions-list').on('click', '.new-question-save', function() {
      // Get question values
      var title = $('#new-question-title').val();
      var helpText = $('#new-question-helptext').val();
      var type = $('.new-question-type option:selected').text();
      var choices = [];
      if (type === "Multiple Choice") {
        $(this).parents('.list-group-item').find('.multiple-choice-option').each(function(index) {
          choices.push($(this).val());
        });
      }
      // Get survey id for URL
      var surveyId = $('#new-question-form').attr('data-survey-id');

      // Create question object
      var question = {
        title: title,
        helpText: helpText,
        type: type,
        choices: choices
      };

      // POST request for question
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
  },

  init: function() {
    TuringSurvey.Question.renderInputs();
    TuringSurvey.Question.hideEditQuestionForm();
    TuringSurvey.Question.editQuestionForm();
    TuringSurvey.Question.editQuestionSubmit();
    TuringSurvey.Question.deleteQuestionSubmit();
    TuringSurvey.Question.createQuestionForm();
    TuringSurvey.Question.createQuestionSubmit();
  }

};
