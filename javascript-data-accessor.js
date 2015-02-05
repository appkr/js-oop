var createPerson = function(firstName, lastName) {
  var person = {};

  Object.defineProperties(person, {
    firstName : {
      value : firstName,
      enumerable : true
    },
    lastName : {
      value : lastName,
      enumerable : true
    },
    fullName : {
      get : function() {
        return this.firstName + " " + lastName;
      },
      enumerable : true
    }
  });

  return person;
};

var person = createPerson("John", "Doe");