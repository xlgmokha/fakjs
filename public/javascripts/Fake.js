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
