var createPerson = function(firstName, lastName) {
  var person = {
    firstName : firstName,
    lastName : lastName,
    sayHello : function () {
      return "Hi there?";
    }
  };

  Object.defineProperty(person, "fullName", {
    get: function() {
      return this.firstName + " " + this.lastName;
    },
    enumerable : true,
    configurable : true
  });

  return person;
};

var createEmployee = function(firstName, lastName, position) {
  var person = createPerson(firstName, lastName);

  person.position = position;

  var fullName = Object.getOwnPropertyDescriptor(person, "fullName");

  // By .bind(person), when fullNameFunction was called it runs
  // as if it were in person object in in this object.
  var fullNameFunction = fullName.get.bind(person);

  Object.defineProperty(person, "fullName", {
    get: function() {
      return fullNameFunction() + ", " + this.position;
    },
    enumerable : true,
    configurable : true
  });

  var sayHelloFn = person.sayHello.bind(person);

  person.sayHello = function () {
    return sayHelloFn() + " My name is " + this.fullName;
  };

  return person;
};

var johnDoe = createEmployee("John", "Doe", "Manager");

/* Test in console
johnDoe.fullName;
johnDoe.firstName = "Jane";
johnDoe.fullName;
johnDoe.sayHello();
*/