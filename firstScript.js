import readlineSync from "readline-sync";

let myName = readlineSync.question("What is your name?"); 
let num1 = 3;
let num2 = 10;  


console.log("hello");
console.log(myName);
console.log(num1 + num2);

console.log("Thank you ", myName, " for your response!");
let reply = readlineSync.question("Enter your reply: ");
console.log(reply);
if (reply.length > 10) {
    console.log("Wow, such a long response!");
}   else {
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

// Use a for loop to get user input for an array
console.log("Enter 3 items for your array: Using for loop: ");
for (let i = 0; i < 3; i++) {
    userInput[i] = readlineSync.question("Enter an array item: ");
}
console.log(userInput);

// Use a while loop to get user input for an array
console.log("Enter 3 items for your array: Using while loop: ");
while (index < 3) {
    userInput[index] = readlineSync.question("Enter an array item: ");
    index = index + 1;
}
console.log(userInput);

// for loop to iterate through the userInput array
console.log("Items in your array: printing using for loop:");
for (let i = 0; i < userInput.length; i++) {
    console.log(`Item ${i + 1}: ${userInput[i]}`);
}
// End of firstScript.js


