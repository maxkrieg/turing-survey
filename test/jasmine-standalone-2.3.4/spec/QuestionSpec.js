describe("question module", function() {
  it("should have the question module be defined", function() {
    expect(TuringSurvey.Question).toBeDefined();
  })

  it("should have the init function in the Question module be defined", function() {
    expect(TuringSurvey.Question.init).toBeDefined();
  })

  it("should see that the renderInputs function is defined", function() {
    expect(TuringSurvey.Question.renderInputs).toBeDefined();
  })

  it("should show that the edit question form show function is defined", function() {
    expect(TuringSurvey.Question.editQuestionForm).toBeDefined();
  })

  it("should show that the hideEditQuestionForm function is defined", function() {
    expect(TuringSurvey.Question.hideEditQuestionForm).toBeDefined();
  })

  it("should show that the editQuestionSubmit is defined", function() {
    expect(TuringSurvey.Question.editQuestionSubmit).toBeDefined();
  })

  it("should show that the deleteQuestionSubmit is defined", function() {
    expect(TuringSurvey.Question.deleteQuestionSubmit).toBeDefined();
  })

  it("should show that the createQuestionSubmit is defined", function() {
    expect(TuringSurvey.Question.createQuestionSubmit).toBeDefined();
  })



})
