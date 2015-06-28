$(document).ready(function() {

  $('.edit-question-form').hide();

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

  $('.edit-survey').on('click', function(e) {
    e.preventDefault();
    console.log($(this));
    var questionId = $(this).attr('data-id');
    $('[data-question="' + questionId + '"]').toggle();
  });


});
