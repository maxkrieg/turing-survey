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
    var questionId = $(this).attr('data-id');
    $('[data-question="' + questionId + '"]').toggle();
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
