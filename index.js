//import the readline library for cleaner output in the terminal
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//random number generator
function randNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min
}
let min = 1
let max = 100
start();
// have the computer greet the user and ask if they would like to play
async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.

  // the game!

  let number = randNum(min, max)
  let answer = await ask(`Is your number ${number}? `)
  let highLow;
  // binary search algo to find the number in as few guesses as possible (thanks youTube!)
  const binary = (val, arr) => {
    let lower = min
    let upper = max;

    while (lower <= upper) {
      const middle = lower + Math.floor((max - min) / 2);

      if (val === arr[middle]) {
        return middle;
      }

      if (val < arr[middle]) {
        upper = middle - 1;
      } else {
        lower = middle + 1
      }
    }
  }
    

  while (answer === "n") {
    console.log("asking higher or lower")
    highLow = await ask(`Is your number higher(h) or lower(l) than ${number}? `)


    console.log("asking higher or lower")

    if (highLow === "h") {
      min = number + 1
      number = randNum(min, max)

      console.log("making new number and asking again")
      console.log(answer)

      answer = await ask(`Is your number ${number}? `)

      console.log(answer)



    } else if (highLow === "l") {
      max = number - 1
      number = randNum(min, max)


      answer = await ask(`Is your number ${number}? `)


    }

  }
  if (answer === "y") {

    console.log("I WIN!!!")
    process.exit()
  }
}
start()                        