describe('survey functions', function() {
  it('validates existence of renderInputs function', function() {
    expect(renderInputs).toBeDefined();
  });

  it('returns the same question type', function() {
    expect(renderInputs('Scale')).toEqual('scale');
  });
});
