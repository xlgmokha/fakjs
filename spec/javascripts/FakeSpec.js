describe ("Fake", function() {
  beforeEach (function() {
    sut = new Fake();
  });
  var sut;
  describe ("when stubbing out return values", function() {
    describe ("when there are no parameters", function() {
      it ("should return the correct value", function() {
        expect(result).toEqual("hello");
      });
      beforeEach (function() {
        sut.stub('greet').andReturn('hello');
        result = sut.greet();
      });
      var result;
    });
    describe ("when there are arguments to match", function() {
      describe ("when there is a single input argument", function() {
        describe ("when invoked as expected", function() {
          it ("should return the value the corresponds to the input arguments", function() {
            expect(sut.greet('mo')).toEqual('hello mo');
          });
          it ("should return the correct value that corresponds to other args", function() {
            expect(sut.greet('jo')).toEqual('hello jo');
          });
          beforeEach (function() {
            sut.stub('greet').with('mo').andReturn('hello mo');
            sut.stub('greet').with('jo').andReturn('hello jo');
          });
        });
        describe ("when invoked unexpectedly", function() {
          it ("should throw an error", function() {
            sut.stub('greet').with('mo').andReturn('hello mo');
            expect(function(){sut.greet('malcolm');}).toThrow("Matcher not found.");
          });
        });
      });
    });
  });
});
