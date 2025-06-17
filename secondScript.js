import readlineSync from "readline-sync";

console.log("Enter a series of five words where each word contains more characters than the previous word");

let words = [];

for (let index = 0; index < 5; index++) {
    words[index] = readlineSync.question("Enter a word: ");
}

let isIncreasing = true;
let index = 0;

while (index < words.length - 1) {
    if (words[index + 1].length <= words[index].length) {
        isIncreasing = false;
    }
    index = index + 1;
}

if (isIncreasing === true) {
    console.log("Great job, you followed the pattern!");
} else {
    console.log("Those words did not follow the pattern, please try again.");
}