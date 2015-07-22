describe("response module", function() {
  it("should see that the response module is defined", function() {
    expect(TuringSurvey.Response).toBeDefined();
  })

  it("should see that the init function is define", function() {
    expect(TuringSurvey.Response.init).toBeDefined();
  })

  it("should see that the multiple choice class toggle function is defined", function() {
    expect(TuringSurvey.Response.multChoiceRadioToggle).toBeDefined();
  })

  it("should show that the submit response function is defined", function() {
    expect(TuringSurvey.Response.submitQuestionResponse).toBeDefined();
  })

})
