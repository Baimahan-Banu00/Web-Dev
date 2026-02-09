//Objects: the basics
//Task1
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

//Task2
function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

//Task3
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  };
  let sum = 0;
  for (let key in salaries) {
    sum += salaries[key];
  }
  alert(sum);

//Task4
function multiplyNumeric(obj) {
    for (let key in obj) {
      if (typeof obj[key] == 'number') {
        obj[key] *= 2;
      }
    }
  }

//Object references and copying
let user = {
    name: "Bota",
    sizes: {
      height: 182,
      width: 50
    }
  };
  alert( user.sizes.height ); 
//1
  let message = "Hello!";
  let phrase = message;
//2
  let user = { name: "John" };
  Object.assign(user, { name: "Pete" });
  alert(user.name);

//Garbage collection
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    return {
      father: man,
      mother: woman
    }
  }
  
  let family = marry({
    name: "Bota"
  }, {
    name: "Nur"
  });

//Object methods, "this"
function makeUser() {
    return {
      name: "John",
      ref: this
    };
  }
  let user = makeUser();
  alert( user.ref.name );

//2
let calculator = {
    sum() {
      return this.a + this.b;
    },
    mul() {
      return this.a * this.b;
    },
    read() {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
    }
  };
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );

//3
let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep() {
      alert( this.step );
      return this;
    }
  };
  ladder.up().up().down().showStep().down().showStep();
  
//Constructor, operator "new"
let obj = {};
function A() { return obj; }
function B() { return obj; }
alert( new A() == new B() );

//2
function Calculator() {
    this.read = function() {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
    };
    this.sum = function() {
      return this.a + this.b;
    };
    this.mul = function() {
      return this.a * this.b;
    };
  }
  let calculator1 = new Calculator();
  calculator1.read();
  alert( "Sum=" + calculator1.sum() );
  alert( "Mul=" + calculator1.mul() );

//3
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function() {
      this.value += +prompt('How much to add?', 0);
    };
  }
  let accumulator = new Accumulator(1);
  accumulator.read();
  accumulator.read();
  alert(accumulator.value);

//Optional chaining '?.'
let user = {};
alert(user.address ? user.address.street : undefined);

//Symbol type
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
alert( Symbol.keyFor(sym) ); 
alert( Symbol.keyFor(sym2) ); 

//...
let id = Symbol("id");
let user = {
  [id]: 123
};
let clone = Object.assign({}, user);
alert( clone[id] ); 

//Object to primitive conversion
let user = {
    name: "John",
    money: 1000,
    toString() {
      return `{name: "${this.name}"}`;
    },
    valueOf() {
      return this.money;
    }
  };
  alert(user); 
  alert(+user); 
  alert(user + 500);