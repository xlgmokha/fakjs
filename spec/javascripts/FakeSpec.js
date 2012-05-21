describe ("Fake", function() {
  beforeEach (function() {
    sut = new Fake();
  });
  var sut;
  describe ("when stubbing out return values", function() {
    describe ("when there is no args", function() {
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
        it ("should return the value the corresponds to the input arguments", function() {
          expect(sut.greet('mo')).toEqual('hello mo');
        });
        it ("should return the correct value that corresponds to other args", function() {
          //expect(sut.greet('jo')).toEqual('hello jo');
        });
        beforeEach (function() {
          sut.stub('greet').with('mo').andReturn('hello mo');
          sut.stub('greet').with('jo').andReturn('hello jo');
        });
      });
    });
  });
});
var Fake = (function(){
  var fake = function(){
    _stubs = [];
    this.stub = function(method){
      if(_stubs[method] === undefined) {
        _stubs[method] = new Stub(this, method);
      }
      return _stubs[method];
    };
  };
  return function(){
    return new fake();
  };
})();

var Stub = (function(){
  var stub = function(target, method){
    this.arguments = [];
    this.with = function(){
      var args = new Arguments(this, target, method, arguments);
      this.arguments.push(args);
      return args;
    };
    this.andReturn = function(return_value){
      target[method] = function(){
        return return_value;
      };
    };
    this.find_match_for = function(args){
      for (var i = 0; i < this.arguments.length; i += 1) {
        var matcher = this.arguments[i];
        if(matcher.matches(args)){
          return matcher;
        }
      }
      throw "Matcher not found.";
    };
  };
  return function(target, method){
    return new stub(target, method);
  };
})();
var Arguments = (function(){
  var Arguments = function(stub, target, method, expected_args){
    this.andReturn = function(return_value){
      this.return_value = return_value;

      target[method] = function(){
        return stub.find_match_for(arguments).return_value;
      };
    };
    this.matches = function(args){
      var result = expected_args === args;
      for (var i = 0; i < expected_args.length; i += 1) {
        if(args[i] !== expected_args[i]){
          return false;
        }
      }
      return true;
    };
  };
  return function(stub, target, method, expected_args){
    return new Arguments(stub, target, method, expected_args);
  };
})();
