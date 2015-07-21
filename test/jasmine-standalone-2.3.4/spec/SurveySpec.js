describe("survey module", function() {
  it("should verify that the survey module exists", function() {
    expect(TuringSurvey.Survey).toBeDefined();
  })

  it("should verify that the init property in survey module exists", function() {
    expect(TuringSurvey.Survey.init).toBeDefined();
  })

})

describe("create survey view", function() {

  it("should verify the createSurveyHideElements function is defined", function() {
    expect(TuringSurvey.Survey.createSurveyHideElements).toBeDefined();
  })

  it("should verify the create survey function is defined", function() {
    expect(TuringSurvey.Survey.createSurveySubmit).toBeDefined();
  })

  it("should verify that the edit survey function is defined", function() {
    expect(TuringSurvey.Survey.editSurveySubmit).toBeDefined();
  })

  it("should verify that the delete survey function is defined", function() {
    expect(TuringSurvey.Survey.deleteSurveySubmit).toBeDefined();
  })


})
