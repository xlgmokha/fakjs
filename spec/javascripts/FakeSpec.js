describe ("Fake", function() {
  beforeEach (function() {
    sut = new Fake();
  });
  var sut;
  describe ("when stubbing out return values", function() {
    describe ("when there is no args", function() {
      it ("should return the correct value", function() {
        expect(result).toEqual("hello mo");
      });
      beforeEach (function() {
        sut.stub('greet').andReturn('hello mo');
        result = sut.greet();
      });
      var result;
    });
  });
});
var Fake = (function(){
  var fake = function(){
    methods = [];
    this.stub = function(method){
      methods.push(method);
      return this;
    };
    this.andReturn = function(return_value){
      var method = methods[methods.length - 1];
      console.log(method);
      this[method] = function(){
        return return_value;
      };
    };
  };
  return function(){
    return new fake();
  };
})();
