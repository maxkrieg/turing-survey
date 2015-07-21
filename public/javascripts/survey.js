var TuringSurvey = TuringSurvey || {};

TuringSurvey.Survey = {

  createSurveyHideElements: function() {
    $('#new-survey-questions, .create-survey-done').hide();
  },

  createSurveySubmit: function() {
    $('.create-survey-submit').on('click', function(e) {
      e.preventDefault();
      var surveyTitle = $('#new-survey-title').val();
      var surveyDescription = $('#new-survey-description').val();
      console.log(surveyTitle + ': ' + surveyDescription);
      // AJAX to POST new survey to database
      var newSurvey = {
        title: surveyTitle,
        description: surveyDescription
      };
      var url = '/surveys';

      $.ajax({
        method: 'POST',
        url: url,
        data: JSON.stringify(newSurvey),
        contentType: "application/json; charset=utf-8"
      }).done(function(response) {
        console.log('success creating survey');
        $('.create-new-survey').remove();
        $('.new-questions-list').append(response);
        $('.multiple-choice, .scale, .text').hide();
        $('#new-survey-questions, .create-survey-done').show();
      }).fail(function() {
        console.log('error POSTing survey');
      });
    });
  },

  editSurveySubmit: function() {
    $('.edit-survey-submit').on('click', function() {
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
  },

  deleteSurveySubmit: function() {
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
  },

  init: function() {
    TuringSurvey.Survey.createSurveyHideElements();
    TuringSurvey.Survey.createSurveySubmit();
    TuringSurvey.Survey.editSurveySubmit();
    TuringSurvey.Survey.deleteSurveySubmit();
  }

} // Close TuringSurvey.Survey
