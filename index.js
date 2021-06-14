//import the readline library for cleaner output in the terminal
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//random number generator
function randNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

// have the computer greet the user and ask if they would like to play
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it. \n\nFirst let's set the range"
  );
  // the user sets the range they want to play with
  let min = 1;
  let max = await ask("\nWhat would you like the high range to be? "); // I can't think of a user friendly way to ask this!!!
  let secretNumber = await ask(
    "\nWhat would you like your number to be?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  secretNumber = parseInt(secretNumber);
  // the game!

  let number = min + Math.floor((max - min) / 2);
  let answer = await ask(`Is your number ${number}? `);
  let highLow;
  // if the secretNumber the player entered at the start is not equal to the computer's guess we are in this while loop
  while (secretNumber !== number) {
    console.log(number);
    console.log(secretNumber);
    highLow = await ask(
      `Is your number higher(h) or lower(l) than ${number}? `
    );
    // if the player says their number was higher than the computer's guess we are here
    if (highLow === "l") {
      max = number - 1;

      number = min + Math.floor((max - min) / 2);

      answer = await ask(`Is your number ${number}? `);
      // if the player says their number was lower than the computer's guess we are here
    } else if (highLow === "h" && number > min) {
      min = number + 1;
      number = min + Math.floor((max - min) / 2);

      answer = await ask(`Is your number ${number}? `);
    
  } else if (highLow === "h" && number < min) {
console.log("Liar liar pants on fire! ")
  }
  // if the secretNumber the player entered at the start is equal to the computer's guess we are in this while loop
  while (secretNumber === number) {
    // if the player truthfully admits the computer guessed their number the computer says "I win" and asks if the player wants to go again
    if (answer === "y") {
      console.log("I WIN!!!");

      if ((await ask("Would you like to play again? ")) === "y") {
        start();
      } else {
        console.log("Okay, thanks for playing! ");
        process.exit();
      }
      //if the player lies about the computer guessing their number
    } else if (answer === "n") {
      console.log(
        `HEY! You said your number was ${number} and I guessed that, YOU CHEATED! I quit! >:| `
      );
      process.exit();
    }
  }
  }
}
start();
