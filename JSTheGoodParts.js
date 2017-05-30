/*
Bryan Kayne's Notes from JavaScript: The Good Parts by Douglas Crockford
***********The notes in this book are property of O'Reilly**************

My notes are notes on things that I didn't pick up through other learnings

Date of Book Start: 5/26/17
Date of Book End: tbd
*/


/*
Chapter 2:

Comments:
- Don't use the commenting technique above, use double '//' because sometimes
escaping characters, like the *, proves faulty.

Strings:
- Strings are immutable- once a string is made, a string can never be changed

Statements:
- A compilation unit contains a set of executable Statements
-- In web browsers, <script>'s deliver a compliation unit that's compiled
   and immediately executed
-- JavaScript throws all executable statements together in a common global
   namespace

- Conditional Statements: if, switch

- Looping Statements: for, while, do

- Disruptive Statements: break, return, throw

- Falsy:
-- False
-- null
-- undefined
-- The empty string ''
-- The number 0
-- The number NaN

- Do vs While:
-- Do executes block first, then checks expression (with while reserved word)
-- While evaluates expression first, then executes block as long as condition is met

- Try Statement:
-- Executes a block and catches any exceptions that were thrown by the block
  Catch clause identifies a new var that will receive the exception object

Expressions:
- The ? ternary operator takes three operands.
-- If the first operand is truthy, it produces the value of the second operand
-- If the first operand is falsy, it produces the value of the third operand
-- Format: expression ? expression (if truthy) : expression (if falsy)

- the values produced by typeof are:
-- 'number', 'string', 'boolean', 'undefined', 'function', and 'object'
-- If the operand is an array or null, then the result is 'object' (which is WRONG)
-- If the operand of ! is truthy, it produces false, otherwise it produces true

Literals:
- Object literals are a convenient way for specifying new objects.
--The names are treated as literal names, not as variable names, so the names of
  the properties of the object must be known at compile time!!

*/

/*
Chapter 3

*/

//Object Literals:
var empty_object = {};

var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};

//Retrieval
console.log(stooge["first-name"]);
console.log(flight.departure.IATA);
console.log(stooge["middle-name"]); //undefined
  //Using the || Operator
  var middle = stooge["middle-name"] || "(none)";
  var status = flight.status || "unkown";
  console.log(middle);
  console.log(status);

  //Using the && operator to guard TypeError exception
  flight.equipment && flight.equipment.model

//Update
stooge['first-name'] = 'Jerome';
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';

//Reference
//Objects are passed around by Reference, never copied
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
  //nick is 'Curly' because x and stooge are ref's to same Object

//Prototype
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

var another_stooge = Object.create(stooge);
console.log(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
console.log(another_stooge);
//If you add a new property to a prototype, that property will immediately be visible in all
//of the objects that are based on that prototype
stooge.profession = 'actor';
console.log(another_stooge.profession); //'actor'

//Reflection
typeof flight.number; //'number'
typeof flight.status; //'string'
typeof flight.manifest; //'undefined'
  //any property on the prototype chain can produce a value:
  typeof flight.toString  // 'function'
  typeof flight.constructor // 'function'
  //hasOwnProperty method returns true if the object has a particular property
  // this method does not look at the prototype chain
  console.log(flight.hasOwnProperty('number'));

//Enumeration
//The following will appear out of order:
// var name;
// for (name in another_stooge) {
//   if (typeof another_stooge[name] !== 'function') {
//     console.log(name + ': ' + another_stooge[name]);
//   }
// }

//THe following is not out of order since it uses an array
var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
for (i = 0; i < properties.length; i += 1) {
  console.log(properties[i] + ': ' + another_stooge[properties[i]]);
}

//Delete
another_stooge.nickname //'Moe'
  //Remove nickname from another_stooge, revealing the nickname of the prototype
  delete another_stooge.nickname;
  another_stooge.nickname;

//Global Abatement
//one way to minimize the use of global variables is to create a single global
//variable for your application:

var MYAPP = {};
MYAPP.stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};


//To Research:
//1. Infix operator
//2. Immutable vs. Mutable
