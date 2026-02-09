/*Hello*/
alert("I’m JavaScript!");

/*Code structure*/ 
alert('Hello'); alert('World');

alert(3 + 1+ 2);

alert("Hello");
[1, 2].forEach(alert);

(function() {
    'use strict';
  

  })()

/*Variables*/
let admin, name; 
name = "John";
admin = name;
alert( admin ); 

let ourPlanetName = "Earth";

let currentUserName = "Bota";

const birthday = '29.01.2007';
const age = someCode(birthday);


// Hard-coded constant → uppercase
const BIRTHDAY = '18.04.1982';
// Runtime constant → lowercase
const age2 = someCode(BIRTHDAY);


/**Data types */
let name2 = "Nurik";
alert( `hello ${1}` ); // hello 1
alert( `hello ${"name2"}` ); // hello name
alert( `hello ${name2}` ); 


/**Interaction: alert, prompt, confirm */
let name3 = prompt("What is your name?", "");
alert(name3);

//alert
alert("Hello");

//confirm
result = confirm(question);

/**Type Conversions*/
//String Conversion
let value = true;
alert(typeof value); 
value = String(value); 
alert(typeof value); 

//Numeric Conversion
alert( "6" / "2" );
let str = "123";
alert(typeof str);
let num = Number(str); 
alert(typeof num); 

//Boolean Conversion
alert( Boolean(1) ); 
alert( Boolean(0) ); 
alert( Boolean("hello") ); 
alert( Boolean("") ); 

//Basic operators, maths
let x = 1;
x = -x;
alert( x );

//Remainder %
alert( 5 % 2 ); 
alert( 8 % 3 ); 
alert( 8 % 4 );

//Exponentiation **
alert( 2 ** 2 ); 
alert( 2 ** 3 ); 
alert( 2 ** 4 );

//String concatenation with binary +
let s = "my" + "string";
alert(s); 
alert( '1' + 2 ); 
alert( 2 + '1' ); 
alert(2 + 2 + '1' );

//Numeric conversion, unary +
let apples = "2";
let oranges = "3";
alert( apples + oranges );

//Modify-in-place
let n = 2;
n = n + 5;
n = n * 2;

//Task
let a = "1"; 
let b = "2"; 
alert(a + b); 

let a1 = +prompt("First number?", 1);
let b1 = +prompt("Second number?", 2);
alert(a1 + b1); 

let a2 = prompt("First number?", 1);
let b2 = prompt("Second number?", 2);
alert(+a2 + +b2)

/**Comparisons*/
alert( 2 > 1 );  
alert( 2 == 1 ); 
alert( 2 != 1 );

let result = 5 > 4; 
alert( result );

alert( 'Z' > 'A' ); 
alert( 'Glow' > 'Glee' );
alert( 'Bee' > 'Be' );

//Task
5 > 4 
"apple" > "pineapple" 
"2" > "12" 
undefined == null
undefined === null 
null == "\n0\n" 
null === +"\n0\n" 

//Conditional branching: if, '?'
let year = prompt('In which year was ECMAScript-2015 specification published?', '');
if (year == 2015) alert( 'You are right!' );

  //2
if (year == 2015) {
    alert( "That's correct!" );
    alert( "You're so smart!" );
  }

  //3
  let year1 = prompt('In which year was the ECMAScript-2015 specification published?', '');
  if (year1 < 2015) {
    alert( 'Too early...' );
  } else if (year1 > 2015) {
    alert( 'Too late' );
  } else {
    alert( 'Exactly!' );
  }

//Task1
if ("0") {
    alert( 'Hello' );
  }
//Task2
  'use strict';
   let value5 = prompt('What is the "official" name of JavaScript?', '');
   if (value5 == 'ECMAScript') {
      alert('Right!');
    } else {
      alert("You don't know? ECMAScript!");
    }

//Task3
let value4 = prompt('Type a number', 0);

if (value > 0) {
  alert( 1 );
} else if (value < 0) {
  alert( -1 );
} else {
  alert( 0 );
}

//Task4
let result2 = (a + b < 4) ? 'Below' : 'Over';

//Task5
let message = (login == 'Employee') ? 'Hello' :
  (login == 'Director') ? 'Greetings' :
  (login == '') ? 'No login' :
  '';

//Logical operators
//1
alert( null || 2 || undefined );
//2
alert( alert(1) || 2 || alert(3) );
//3
alert(1 && null && 2);
//4
alert( alert(1) && alert(2) );
//5
alert( null || 2 && 3 || 4 );
null || 3 || 4
//6
if (age >= 14 && age <= 90);
if (!(age >= 14 && age <= 90))  
    if (age < 14 || age > 90);
//7
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
//8
let userName = prompt("Who's there?", '');
if (userName === 'Admin') {
  let pass = prompt('Password?', '');
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}


//Nullish coalescing operator '??'
result = (a !== null && a !== undefined) ? a : b;

let user;
alert(user ?? "Anonymous");

let user1 = "Akbota";
alert(user ?? "Anonymous");

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

//Loops: while and for
let i = 0;
while (i < 3) { 
  alert( i );
  i++;
}
//do while
let i1 = 0;
do {
  alert( i1 );
  i1++;
} while (i1 < 3);

//for
for (let i = 0; i < 3; i++) { 
    alert(i);
  }

//Breaking the loop
let sum = 0;
while (true) {
  let value = +prompt("Enter a number", '');
  if (!value) break; 
  sum += value;
}
alert( 'Sum: ' + sum );

//Task
//1
let i2 = 3;
while (i2) {
  alert( i2-- );
}
//2
let i3 = 0;
while (++i3 < 5) alert( i3 );

//3
for (let i = 0; i < 5; ++i) alert( i );
for (let i = 0; i < 5; i++) alert( i );

//4
for (let i = 2; i <= 10; i++) {
    if (i % 2 == 0) {
      alert( i );
    }
  }

//5
let i4= 0;
while (i4< 3) {
  alert( `number ${i4}!` );
  i4++;
}

//6
let num3;
do {
  num3 = prompt("Enter a number greater than 100?", 0);
} while (num3 <= 100 && num3);

//7
let n7 = 10;
nextPrime:
for (let i = 2; i <= n; i++) { 
  for (let j = 2; j < i; j++) { 
    if (i % j == 0) continue nextPrime; 
  }
  alert( i );
}

//The "switch" statement
//1
if(browser == 'Edge') {
    alert("You've got the Edge!");
  } else if (browser == 'Chrome'
   || browser == 'Firefox'
   || browser == 'Safari'
   || browser == 'Opera') {
    alert( 'Okay we support these browsers too' );
  } else {
    alert( 'We hope that this page looks ok!' );
  }

//2
let a3= +prompt('a?', '');

switch (a3) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
    break;
}

//Functions
//1
function checkAge(age) {
    return (age > 18) ? true : confirm('Did parents allow you?');
  }

function checkAge(age) {
    return (age > 18) || confirm('Did parents allow you?');
  }

//2
function min(a, b) {
    if (a < b) {
      return a;
    } else {
      return b;
    }
  }

function min(a, b) {
    return a < b ? a : b;
  }

//3
function pow(x, n) {
    let result = x;
  
    for (let i = 1; i < n; i++) {
      result *= x;
    }
  
    return result;
  }
  
  let x2 = prompt("x?", '');
  let n2 = prompt("n?", '');
  
  if (n2< 1) {
    alert(`Power ${n2} is not supported, use a positive integer`);
  } else {
    alert( pow(x2, n2) );
  }


//Function expressions
let age4 = prompt("What is your age?", 18);
let welcome;
if (age < 18) {
  welcome = function() {
    alert("Hello!");
  };
} else {
  welcome = function() {
    alert("Greetings!");
  };
}
welcome(); 

//Arrow functions, the basics
function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
  }
  ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
  );

//JavaScript specials,The “switch” construct
let age7 = prompt('Your age?', 18);
switch (age7) {
  case 18:
    alert("Won't work"); 
    break;
  case "18":
    alert("This works!");
    break;
  default:
    alert("Any value not equal to one above");
}

let sum3 = function(a, b) {
    let result = a + b;
    return result;
  };

