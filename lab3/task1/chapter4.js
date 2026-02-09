//Data types
//Methods of primitives
let str = "Hello";
str.test = 5; 
alert(str.test);

//Numbers
//task1
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");
alert( a + b );

//task2
alert( (6.35 * 10).toFixed(20) );
alert( Math.round(6.35 * 10) / 10 );
alert( 1.35.toFixed(20) ); 

//task3
function readNumber() {
    let num;
    do {
      num = prompt("Enter a number please?", 0);
    } while ( !isFinite(num) );
    if (num === null || num === '') return null;
    return +num;
  }
  alert(`Read: ${readNumber()}`);

//task4
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}

//task5 
function random(min, max) {
    return min + Math.random() * (max - min);
  }
  alert( random(1, 5) );
  alert( random(1, 5) );
  alert( random(1, 5) );

//task6
function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }
  alert( randomInteger(1, 3) );


//Strins
//task1
function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
  alert( ucFirst("john") );

//task2
function checkSpam(str) {
    let lowerStr = str.toLowerCase();
    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
  }
  alert( checkSpam('buy ViAgRA now') );
  alert( checkSpam('free xxxxx') );
  alert( checkSpam("innocent rabbit") );

//task3
function truncate(str, maxlength) {
    return (str.length > maxlength) ?
      str.slice(0, maxlength - 1) + '…' : str;
  }

//task4
function extractCurrencyValue(str) {
    return +str.slice(1);
  }


//Arrays task1
let fruits = ["Apples", "Pear", "Orange"];
let shoppingCart = fruits;
shoppingCart.push("Banana");
alert( fruits.length );

//task2
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics";
alert( styles.shift() );
styles.unshift("Rap", "Reggae");

//task3
let arr = ["a", "b"];
arr.push(function() {
  alert( this );
})
arr[2]();

//task4
function sumInput() {
    let numbers = [];
    while (true) {
      let value = prompt("A number please?", 0);
      if (value === "" || value === null || !isFinite(value)) break;
      numbers.push(+value);
    }
    let sum = 0;
    for (let number of numbers) {
      sum += number;
    }
    return sum;
  }
  alert( sumInput() );

//task5
function getMaxSubSum(arr) {
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) { 
      partialSum += item; 
      maxSum = Math.max(maxSum, partialSum); 
      if (partialSum < 0) partialSum = 0; 
    }
    return maxSum;
  }
  alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
  alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
  alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
  alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
  alert( getMaxSubSum([1, 2, 3]) ); // 6
  alert( getMaxSubSum([-1, -2, -3]) ); // 0


//Array methods
//task1
function camelize(str) {
    return str
      .split('-') 
      .map(
        (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join('');
  }

//task2
function filterRange(arr, a, b){
    return arr.filter(item => (a <= item && item <= b));
  }
  let arr1 = [5, 3, 8, 1];
  let filtered = filterRange(arr, 1, 4);
  alert( filtered ); 
  alert( arr );

//task3
function filterRangeInPlace(arr2, a, b) {
    for (let i = 0; i < arr2.length; i++) {
      let val = arr2[i];
      if (val < a || val > b) {
        arr2.splice(i, 1);
        i--;
      }
    }
  }
  let arr2 = [5, 3, 8, 1];
  filterRangeInPlace(arr2, 1, 4); 
  alert( arr2);

//task4
let arr3 = [5, 2, 1, -10, 8];
arr3.sort((a, b) => b - a);
alert( arr3 );

//task5
function Calculator() {

    this.methods = {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b
    };
  
    this.calculate = function(str) {
      let split = str.split(' '),
        a = +split[0],
        op = split[1],
        b = +split[2];
      if (!this.methods[op] || isNaN(a) || isNaN(b)) {
        return NaN;
      }
      return this.methods[op](a, b);
    };
    this.addMethod = function(name, func) {
      this.methods[name] = func;
    };
  }

//task6
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };
let users = [ john, pete, mary ];
let names = users.map(item => item.name);
alert( names );

//task7
function sortByAge(arr) {
    arr.sort((a, b) => a.age - b.age);
  }
  
  let Ai = { name: "Ai", age: 25 };
  let Amer = { name: "Amer", age: 30 };
  let Nur = { name: "NUr", age: 28 };
  
  let arr4 = [ pete, john, mary ];
  
  sortByAge(arr4);
  alert(arr4[0].name); 
  alert(arr4[1].name); 
  alert(arr4[2].name);

//task8
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  let arr5= [1, 2, 3];
  shuffle(arr5);
  alert(arr5);

//task9
function getAverageAge(users) {
    return users.reduce((prev, user) => prev + user.age, 0) / users.length;
  }
  
  let Guli = { name: "Guli", age: 25 };
  let Mia = { name: "Mia", age: 30 };
  let Sery = { name: "Sery", age: 29 };
  
  let arr6 = [ john, pete, mary ];
  
  alert( getAverageAge(arr6) );

//task10
function unique(arr) {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }
  let strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  alert( unique(strings) );

//task11
function groupById(array) {
    return array.reduce((obj, value) => {
      obj[value.id] = value;
      return obj;
    }, {})
  }

//Iterables
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
  };
  let arr7 = Array.from(arrayLike); 
  alert(arr7.pop());

//Map and Set
//task1
function unique(arr) {
    return Array.from(new Set(arr));
  }

//task2
function aclean(arr9) {
    let map = new Map();
    for (let word of arr9) {
      let sorted = word.toLowerCase().split('').sort().join(''); 
      map.set(sorted, word);
    }
    return Array.from(map.values());
  }
  let arr9= ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
  alert( aclean(arr9));

//task3
let map=new Map();
map.set("name", "John");
let keys = Array.from(map.keys());
keys.push("more");
alert(keys); 


//WeakMap and WeakSet
//task1
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
  ];
  let readMessages = new WeakSet();
  readMessages.add(messages[0]);
  readMessages.add(messages[1]);
  readMessages.add(messages[0]);
  alert("Read message 0: " + readMessages.has(messages[0])); 
  messages.shift();

//task2
let messages1 = [
    {text: "Hello", from: "Bota"},
    {text: "How goes?", from: "Ayau"},
    {text: "See you soon", from: "Yamur"}
  ];
  let readMap = new WeakMap();
  readMap.set(messages1[0], new Date(2017, 1, 1));


//Object.keys, values, entries
//task1
function sumSalaries(salaries) {
    let sum = 0;
    for (let salary of Object.values(salaries)) {
      sum += salary;
    }
    return sum; 
  }
  let salaries = {
    "Anyone": 100,
    "noone": 300,
    "neyse": 250
  };
  alert( sumSalaries(salaries) ); 
//task2
function count(obj) {
    return Object.keys(obj).length;
  }

//Destructuring assignment
//task1
let user = {
    name1: "Era",
    years: 30
  };
  let {name1, years: age, isAdmin = false} = user;
  alert( name1); 
  alert( age ); 
  alert( isAdmin );

//task2
function topSalary(salaries) {
    let maxSalary = 0;
    let maxName = null;
    for(const [name, salary] of Object.entries(salaries)) {
      if (maxSalary < salary) {
        maxSalary = salary;
        maxName = name;
      }
    }
    return maxName;
}

//Date and time
//task1
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
let d2 = new Date("2012-02-20T03:12");
alert( d1 );


//task2
function getWeekDay(date) {
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return days[date.getDay()];
  }
  let date = new Date(2014, 0, 3); 
  alert( getWeekDay(date) );


//task3
function getLocalDay(date) {
    let day = date.getDay();
    if (day == 0) { 
      day = 7;
    }
    return day;
  }


//task4
function getDateAgo(date, days) {
    date.setDate(date.getDate() - days);
    return date.getDate();
  }


//task5
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }
  alert( getLastDayOfMonth(2012, 0) ); 
  alert( getLastDayOfMonth(2012, 1) ); 
  alert( getLastDayOfMonth(2013, 1) );


//task6
function getSecondsToday() {
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  }
  alert( getSecondsToday() );


//task7
function getSecondsToTomorrow() {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
    let totalSecondsInADay = 86400;
    return totalSecondsInADay - totalSecondsToday;
  }


//task8
function formatDate(date) {
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let diffMs = new Date() - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = diffSec / 60;
    let diffHour = diffMin / 60;
    year = year.toString().slice(-2);
    month = month < 10 ? '0' + month : month;
    dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (diffSec < 1) {
      return 'right now';
    } else if (diffMin < 1) {
      return `${diffSec} sec. ago`
    } else if (diffHour < 1) {
      return `${diffMin} min. ago`
    } else {
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
    }
  }



//JSON methods, toJSON
//task1
let user1= {
    name: "Bota Nurkasymova",
    age: 35
  };
  let user2 = JSON.parse(JSON.stringify(user));


//task2
let room = {
    number: 23
  };
  let meetup = {
    title: "Conference",
    occupiedBy: [{name: "John"}, {name: "Alice"}],
    place: room
  };
  room.occupiedBy = meetup;
  meetup.self = meetup;
  alert( JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
  }));