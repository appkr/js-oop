var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

// every object from Person has below properties.
Object.defineProperties(Person.prototype, {
  sayHi : {
    value : function () {
      return "Hi there ?";
    },
    enumerable : true
  },
  fullName : {
    get : function() {
      return this.firstName + " " + this.lastName;
    },
    enumerable : true
  }
});

var johnDoe = new Person("John", "Doe");

/*
johnDoe.sayHi();
Person.prototype.sayHi();
*/