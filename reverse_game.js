//import the readline library for cleaner output in the terminal
const { platform } = require("os");
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

//computer greets the player and proposes the game
async function guess() {
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it.\nLet's use numbers between 1 and 25 for now. "
  );
  //variables setup
  let min = 1;
  let max = 25;
  let cpuNum = randNum(min, max);
  // first guess
  let playerNum = await ask("Go ahead... make a guess! ");
  parseInt(playerNum);
  // if the player hasn't guessed the number yet we should be in this while loop
  while (cpuNum !== playerNum) {
    // if the player guesses a number higher than than the computers number it says lower
    if (cpuNum < playerNum) {
      playerNum = await ask("It's lower than that, guess again! ");
      parseInt(playerNum);
      // if the player guesses a number lower than than the computers number it says higher
    } else if (cpuNum > playerNum) {
      playerNum = await ask("It's higher than that, try again! ");
      parseInt(playerNum);
    }
  }
  // if the player guesses correctly, they win! The computer asks to play again or exits
  while (cpuNum === playerNum) {
  
    if ((await ask("Wow you got it! Way to go!\nWould you like to play again? ")) === "y") {
      guess();
    } else {
      console.log("Okay, thanks for playing! ");
      process.exit();
    }
  }
}
guess();
