var TuringSurvey = TuringSurvey || {};

TuringSurvey.Response = {

  hideAllButFirst: function() {
    $('#survey-questions').children('.view-survey-question').hide();
    $('#survey-questions, .view-survey-question:first-child').show();
  },

  multChoiceRadioToggle: function() {
    $('.radio-button').on('click', function() {
      $('.radio-button').removeClass('selected-radio');
      $(this).addClass('selected-radio');
    });
  },

  submitQuestionResponse: function() {
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

      // PUT request to add to response array on question model
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

  },

  init: function() {
    TuringSurvey.Response.hideAllButFirst();
    TuringSurvey.Response.multChoiceRadioToggle();
    TuringSurvey.Response.submitQuestionResponse();
  }

}
