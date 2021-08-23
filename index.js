//import the readline library for cleaner output in the terminal
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// starting question to ask which game the player would like to play
async function start() {
  let game = await ask(
    "Would you like to play a game where I (the computer) guesses a number you choose or where you the player makes the guesses? (Enter 1 for player guessing or 2 for computer guessing.)\n"
  );
// starting the correct game based on user input
  if (game === "1") {
    playerGuess();
  } else if (game === "2") {
    computerGuess();
  } else if (game === "n") {
    console.log("Thanks for wasting my time >:( "); //if user says "n" the computer gets mad and quits
    process.exit();
  } else {
    console.log("Please enter 1 or 2"); // if anything other than "1, 2 or n" is entered the program starts again
    start();
  }
}

// have the computer greet the user and ask if they would like to play
async function computerGuess() {
  // the game!
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it. \n\nFirst let's set the range"
  );
  // the user sets the range they want to play with
  let min = 1;
  let rangeMax = await ask("\nWhat would you like the high range to be? "); // I can't think of a user friendly way to ask this!!!
  let max = parseInt(rangeMax); //making the entered max an integer
  //the player enters their number
  let secretNumber = await ask(
    "\nWhat would you like your number to be?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  secretNumber = parseInt(secretNumber); //making the players number an integer
// the computer will smartly guess the number in the middle of the range
  let number = min + Math.floor((max - min) / 2);
  let answer = await ask(`Is your number ${number}? `); // the computer guesses
  let guesses = 1; // starting to keep track of guesses
  let highLow;
  // if the secretNumber the player entered at the start is equal to the computer's first guess and the player enters "y", the computer wins and gloats
  if (secretNumber === number && answer === "y" && guesses === 1) {
    console.log("I got it first try, PC MASTER RACE");
    if ((await ask("Would you like to play again? ")) === "y") {
      start();
    } else {
      console.log("Okay, thanks for playing! ");
      process.exit();
    }
    // if the player says the computer guessed correctly when it actually didn't it graciously accepts the win
  } else if (secretNumber !== number && answer === "y") {
    console.log("That wasn't your number but I'll take the win!")
    if ((await ask("Would you like to play again? ")) === "y") {
      start();
    } else {
      console.log("Okay, thanks for playing! ");
      process.exit();
    }
  }
  // if the player lies about the computer guessing the correct number it calls them out and quits
  else if (secretNumber === number && answer === "n") {
    console.log("You're a cheater and I quit!");
    process.exit();
  }
  while (secretNumber !== number && answer === "n") {
    // if the secretNumber the player entered at the start is not equal to the computer's guess we are in this while loop
    highLow = await ask(
      `Is your number higher(h) or lower(l) than ${number}? `
    );
    // if the player says their number was lower than the computer's guess we are here
    if (highLow === "l" && number <= max && number > secretNumber) {
      max = number - 1; // readjusting the max
      number = min + Math.floor((max - min) / 2); // making a smart guess
      guesses = guesses + 1; // adding to the guesses
      answer = await ask(`Is your number ${number}? `);
      // if the player lies about the number being lower
    } else if (highLow === "l" && number < secretNumber) {
      console.log("Liar liar pants on fire! I don't play with cheaters... ");
      process.exit();

      // if the player says their number was higher than the computer's guess we are here
    } else if (highLow === "h" && number >= min && number < secretNumber) {
      min = number + 1; // readjusting the min
      number = min + Math.floor((max - min) / 2); // making a smart guess
      guesses = guesses + 1; // adding to the guesses
      answer = await ask(`Is your number ${number}? `);
      // if the player lies about the number being higher
    } else if (highLow === "h" && number > secretNumber) {
      console.log("Liar liar pants on fire! I don't play with cheaters... ");
      process.exit();
    }
  }
  // when the player says the computer guessed correctly it says "I win" and shows how many guesses it took and asks to play again
  if (secretNumber === number && answer === "y" && guesses > 1) {
    console.log(`I win! And it only took me ${guesses} guesses.`);
    if ((await ask("Would you like to play again? ")) === "y") {
      start();
    } else {
      console.log("Okay, thanks for playing! ");
      process.exit();
    }
    // if the player lies about the computer being correct it quits
  } else if (secretNumber === number && answer !== "y") {
    console.log("Cheater cheater pumpkin eater! I quit! ");
    process.exit();
  }
}

//random number generator for player guessing game
function randNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//computer greets the player and proposes the game
async function playerGuess() {
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it.\nLet's use numbers between 1 and 25 for now. "
  );
  //variables setup
  let min = 1;
  let max = 25;
  let cpuNum = randNum(min, max);
  // first guess
  let playerNum = await ask("Go ahead... make a guess! ");
  playerNum = parseInt(playerNum);

  if (cpuNum === playerNum) {
    console.log("Wow you got it first try!");
    let playAgain = await ask("Do you want to play again? \n");
    if (playAgain === "y") {
      start();
    } else {
      console.log("Okay, thanks for playing!");
      process.exit();
    }
  } else {
    // if the player hasn't guessed the number yet we should be in this while loop
    while (cpuNum !== playerNum) {
      // if the player guesses a number higher than than the computers number it says lower
      if (cpuNum < playerNum) {
        playerNum = await ask("It's lower than that, guess again! ");
        playerNum = parseInt(playerNum);
        // if the player guesses a number lower than than the computers number it says higher
      } else if (cpuNum > playerNum) {
        playerNum = await ask("It's higher than that, try again! ");
        playerNum = parseInt(playerNum);
      }
    }
    // if the player guesses correctly, they win! The computer asks to play again or exits
    console.log("You got it! Congrats! ");
    let playAgain = await ask("Do you want to play again? \n");
    if (playAgain === "y") {
      start();
    } else {
      console.log("Okay, thanks for playing!");
      process.exit();
    }
  }
}

start();
