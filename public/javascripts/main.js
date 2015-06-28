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
    $('[data-question="' + questionId + '"]').toggle();
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

  // $(".edit-type-select")
  //   .change(function() {
  //     var selectedType = "";
  //     $(".edit-type-select option:selected").each(function() {
  //       selectedType += $(this).text() + " ";
  //     });
  //     console.log(selectedType);
  //     if (selectedType === "Multiple Choice") {
  //       $('.multiple-choice').show();
  //       $('.scale').hide();
  //       $('.text').hide();
  //     }
  //   })
  //   .change();




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
