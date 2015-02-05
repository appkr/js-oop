var createPerson = function(firstName, lastName) {
  return {
    firstName : firstName,
    lastName : lastName,
    sayHi : function() {
      return "Hi There";
    }
  };
};

var johnDoe = createPerson("John", "Doe");
var janeDoe = createPerson("Jane", "Doe");

janeDoe.sayHi = function() {
  return "Hey There";
};