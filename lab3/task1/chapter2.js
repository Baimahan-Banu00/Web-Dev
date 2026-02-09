//Code quality
//Debugging in the browser
function hello(name) {
    let phrase = `Hello, ${name}!`;
    debugger; 
    say(phrase);
  }

//Logging
for (let i = 0; i < 5; i++) {
    console.log("value,", i);
  }

//Coding Style
//Task1
function pow(x,n)  
{  
  let result=1;   
  for(let i=0;i<n;i++) {result*=x;}   
  return result;
}
let x=prompt("x?",''), n=prompt("n?",'') 
if (n<=0)  
{  
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else 
{
  alert(pow(x,n))  
}

//Ninja code
function ninjaFunction(elem) {
    elem = clone(elem);
}

//Automated testing with Mocha
//Task
describe("Raises x to power n", function() {
    it("5 in the power of 1 equals 5", function() {
      assert.equal(pow(5, 1), 5);
    });
  
    it("5 in the power of 2 equals 25", function() {
      assert.equal(pow(5, 2), 25);
    });
  
    it("5 in the power of 3 equals 125", function() {
      assert.equal(pow(5, 3), 125);
    });
  });

//Polyfills and transpilers
height = height ?? 100;
height = (height !== undefined && height !== null) ? height : 100;

