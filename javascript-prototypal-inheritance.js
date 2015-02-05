var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

Object.defineProperties(Person.prototype, {
  sayHi : {
    value : function () {
      return "Hi there";
    },
    enumerable : true
  },
  fullName : {
    get : function () {
      return this.firstName + " " + lastName;
    },
    enumerable : true
  }
});

var Employee = function(firstName, lastName, position) {
  Person.call(this, firstName, lastName);

  this.position = position;
};

Employee.prototype = Object.crate(Person.prototype, {
  sayHi : {
    value : function () {
      return Person.protytype.sayHi.call(this) + " My name is " + this.fullName;
    },
    enumerable : true
  },
  fullName : {
    get : (function () {
      var desc = Object.getOwnPropertyDescriptor(Person.prototype, "fullName").get;

      return function () {
        return desc.call(this) + ", " + this.position;
      };
    })(),
    enumerable : true
  }
});

var johnDoe = new Employee("John", "Doe", "Manager");