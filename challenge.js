// // Coding Challenge #1

// // Let's build a simple poll app!
// // A poll has a question, an array of options from which people can choose, and an
// // array with the number of replies for each option. This data is stored in the starter
// // 'poll' object below.

// // Your tasks:
// // 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// // method does 2 things:
// // 1.1. Display a prompt window for the user to input the number of the
// // selected option. The prompt should look like this:
// // What is your favourite programming language?
// // 0: JavaScript
// // 1: Python
// // 2: Rust
// // 3: C++
// // (Write option number)
// // 1.2. Based on the input number, update the 'answers' array property. For
// // example, if the option is 3, increase the value at position 3 of the array by
// // 1. Make sure to check if the input is a number and if the number makes
// // sense (e.g. answer 52 wouldn't make sense, right?)
// // 2. Call this method whenever the user clicks the "Answer poll" button.

// // 3. Create a method 'displayResults' which displays the poll results. The
// // method takes a string as an input (called 'type'), which can be either 'string'
// // or 'array'. If type is 'array', simply display the results array as it is, using
// // console.log(). This should be the default option. If type is 'string', display a
// // string like "Poll results are 13, 2, 4, 1".
// // 4. Run the 'displayResults' method at the end of each
// // 'registerNewAnswer' method call.
// // 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// // data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// // object! So what should the this keyword look like in this situation?

// // Test data for bonus:
// // § Data 1: [5, 2, 3]
// // § Data 2: [1, 5, 3, 9, 6, 1]
// // Hints: Use many of the tools you learned about in this and the last section 😉
// // GOOD LUCK 😀

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const poll = {
//   question: "What is your favourite programming language?",
//   options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer: function () {
//     readline.question(
//       "What is your favourite programming language? \r\n 0: JavaScript \r\n 1: Python \r\n 2: Rust \r\n 3: C++ \r\n (Write option number) \r\n",
//       (number) => {
//         if (number >= 0 && number <= 3) {
//           this.answers[number]++;
//         }
//         readline.close();
//       }
//     );
//   },
//   displayResults: function (type) {
//     if (typeof type == "string") {
//       console.log(
//         `Poll results are ${this.answers.toString().split(",").join(" ")}`
//       );
//     } else {
//       console.log(this.answers);
//     }
//   },
// };

// // readline.question("Who are you?", (name) => {
// //   console.log(`Hey there ${name}!`);
// //   readline.close();
// // });

// poll.registerNewAnswer();
// poll.displayResults([]);

// // One time functions
// (() => {
//   console.log("One time function");
// })();

// CLOSURES

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();

// console.dir(booker);

// example 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2); // 46
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2); // 1554
//   };
// };

// g();
// f(); // a variable is in backpack of "f" function - 46
// h(); // b variable is in backpack of "h" function - 1554
// f(); // variable "a" does not exists in this time, because it was replaced by "b" after second closure was created ( closure changed from function "g" scope to "h" scope)

// example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, earch with ${perGroup} passengers`);
//   }, wait * 1000); // setTimeout was execured independently of boardPassengers, because it was gone from callStack by the time the setTimeout run its function -> its example of closue :)

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000; // again using perGroup as global variable, but setTimeout uses closest variable that match the name. But when we remove perGrup from boardPassengers it will use this global variable :)
// boardPassengers(180, 3);

// (function () {
//   const header = document.querySelector("h1");
//   header.style.color = "red";
// })();

// ####CHALLENGE 1 ####

// const julias = [3, 5, 2, 12, 7];
// const kates = [4, 1, 15, 8, 3];
// const checkDogs = function (dogsJulia, dogsKate) {
//   let copyJulias = [...julias];
//   copyJulias = copyJulias.slice(1, 3);
//   const bothArray = [...copyJulias, ...kates];
//   bothArray.forEach((el, i) => {
//     if (el >= 3) {
//       console.log(`Dog number ${i + 1} is an adult and is ${el} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
//   console.log("Original Julias", julias);
//   console.log("Original kates", kates);
// };

// checkDogs(julias, kates);

// ####CHALLENGE 2 ####

// const ages = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = (ages) => {
//   const dogInHumanAges = ages.map((age) => {
//     if (age <= 2) {
//       return age * 2;
//     } else {
//       return 16 + age * 4;
//     }
//   });
//   const adultDogs = dogInHumanAges.filter((age) => age >= 18);
//   const averageAgeofAdultDogs =
//     adultDogs.reduce((a, b) => a + b, 0) / adultDogs.length;
//   console.log(dogInHumanAges);
//   console.log(adultDogs);
//   console.log(averageAgeofAdultDogs);
// };

// calcAverageHumanAge(ages);

// ####CHALLENGE 3 ####

// const ages = [5, 2, 4, 1, 15, 8, 3];
// const calculateAverageHumanAge = (ages) => {
//   const dogInHumanAges = ages
//     .map((age) => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter((dogAge) => dogAge >= 18)
//     .reduce((a, b, i, array) => a + b / array.length, 0);
//   console.log(dogInHumanAges);
// };

// calculateAverageHumanAge(ages);

// #####  Coding Challenge #4 #####

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)

// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

const checkSuppy = (current, recommended) => {
  if (current > recommended * 0.9) {
    console.log("Dog is eating too much");
    return true; // eating too much
  } else if (current < recommended * 1.1) {
    console.log("Dog is eating too less");
    return false; // eating too less
  }
};

// task 1
dogs.forEach((dog) => {
  dog.recomendedFood = Math.ceil(dog.weight ** 0.75 * 28);
});

// task 2
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
checkSuppy(sarahDog.curFood, sarahDog.recomendedFood);

// task 3
const ownersEatTooMuch = [...dogs].filter(
  (dog) => dog.curFood > dog.recomendedFood
);
const ownersEatTooLittle = [...dogs].filter(
  (dog) => dog.curFood < dog.recomendedFood
);

// console.log("dogs that eat too much", ownersEatTooMuch);
// console.log("dogs that eat too less", ownersEatTooLittle);

//Task 4
const ownersTooMuch = ownersEatTooMuch
  .map((dog) => dog.owners)
  .flat()
  .join(" and ");
const ownersTooLess = ownersEatTooLittle
  .map((dog) => dog.owners)
  .flat()
  .join(" and ");

// console.log(ownersTooMuch + " dogs eating too much!");
// console.log(ownersTooLess + " dogs eating too less!");

//Task 5
const condition = dogs.some((dog) => dog.curFood === dog.recomendedFood);
// console.log(condition);

//Task 6
//current > (recommended * 0.90) && current < (recommended * 1.10)
const ok = (dogs) =>
  dogs.some(
    (dog) =>
      dog.curFood > dog.recomendedFood * 0.9 &&
      dog.curFood < dog.recomendedFood * 1.1
  );
// console.log(ok(dogs));

//Task 7
const okDogs = dogs.map((dog) => {
  if (
    dog.curFood > dog.recomendedFood * 0.9 &&
    dog.curFood < dog.recomendedFood * 1.1
  ) {
    return dog;
  }
});

// console.log(okDogs);

//Task 8

const shallowCopy = [...dogs].sort(
  (a, b) => a.recomendedFood - b.recomendedFood
);
console.log(shallowCopy);

// GOOD LUCK 😀
