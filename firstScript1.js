import readlineSync from "readline-sync";

const myName = readlineSync.question("What is your name? ");
const num1 = 3;
const num2 = 10;

console.log("hello");
console.log(myName);
console.log(num1 + num2);

const reply = readlineSync.question("Enter your reply: ");
console.log(reply);

if (reply.length > 10) {
    console.log("Wow, such a long response!");
} else {
    console.log("Nice and concise!");
}

let meals = ["dinner", "breakfast", "lunch"];

console.log(meals[0]);
console.log(meals[1]);
console.log(meals[2]);

meals[3] = "dinner";

console.log(meals[3]);

let userInput = [];
let index = 0;

while (index < 3) {
    userInput[index] = readlineSync.question("Enter an array item: ");
    index = index + 1;
}

console.log(userInput);