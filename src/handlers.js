const prompt = require('prompt-sync')( { sigint: true } );
const {
  getUserOpt,
  getRandomIntInRange,
  terminalLineBreak,
  delay
} = require(`./utils.js`)
// -------------------------------------------------------------- //
// ----------------------- MAIN FUNCTIONS ----------------------- // 
// -------------------------------------------------------------- //
const welcomeAndGetName = () => {
  // todo maybe name validation? if needed?
  console.log(`Hello there!\n${terminalLineBreak('-')}`);
  console.log("How should I call you? (No spaces, and alphabet characters only!)");
  return getUserOpt('name');
}

const showOptions = () => {
  console.log(`${terminalLineBreak('-')}`);
  console.log("Here's your options:");
  console.log(`1 - play a guessing game`);
  console.log(`2 - words of wisdom`);
  console.log(`3 - cheer you on`);
  console.log(`* - exit\n`);
}

const sayGoodbye = (name) => {
  console.log(`\n${terminalLineBreak("-")}\nGoodbye, ${name}!\n${terminalLineBreak("-")}\n`);
}

const handleGuessingGame = async () => {
  process.stdout.write("\nLet me think of a number");
  for (let i=0; i < 3; i++) {
    await delay(500);
    process.stdout.write(".");
  }

  await delay(500);
  console.log(`\n\nHere's the rules:\nYou get a total of five (5) guesses, and I WILL count repeat guesses against you!\n`);
  await delay(500)
  console.log(`Alrighty, guess away!\n(It's a number from 1 to 10!)\n`);

  // generate a random number from 1-10
  const randNum = getRandomIntInRange(1,10);
  let numGuesses = 5;
  let userNum = getUserOpt('num');
  // erm idk this is the easiest way i can think of
  //   to track numGuesses properly for printing
  while (true) {
    numGuesses--;
    // once matched
    if (userNum === randNum) {
      break;
    }
    // out of guesses
    if (numGuesses == 0) {
      console.log("\nToo bad... You're all out of guesses!");
      console.log(`It was ${randNum}!!!`);
      return;
    }
    // more guesses
    console.log(`\nNope, that's not it. ${numGuesses} left!\n`);
    userNum = getUserOpt('num');
  }

  // if user guessed right
  if (numGuesses == 0) {
    console.log("\nThat's cutting it too close with zero (0) guesses left... You still got it though!");
  } else if (numGuesses == 4) {
    console.log(`\nLuck might just be on your side today... You did it in the first try!`);
  } else {
    console.log(`\nWow, you actually did it! And with ${numGuesses} guesses left to boot.`);
  }

  await prompt(`\n👉 Press any key to go back to the main menu!`);
}

const wordsOfWisdom = [
  'You should go to bed by 12:30',
  "It's better to mostly understand a little more every day, than to never move forward until you understand everything",
  'Eating breakfast has statistical benefits to brain power',
  "The best laid plans often fail, but plans that don't exist can never succeed",
  'Time management and communication are the two most important skills in the workplace',
  'Try to listen more than you speak',
]
const getWordsOfWisdom = () => wordsOfWisdom[getRandomIntInRange(0, wordsOfWisdom.length)];
const handleWordsOfWisom = () => {
  console.log(`\n${terminalLineBreak("~")}\n${getWordsOfWisdom()}\n${terminalLineBreak("~")}`);
  prompt(`\n👉 Press any key to go back to the main menu!`);
}

const cheers = [
  'You can do it!',
  'You are the best!',
  'You are a coding machine!',
  'YOU ARE UNREALLLLLLLLL!',
  'LITERALLY UNSTOPPABLE!',
  "Can't even handle your greatness right now!",
];
const getCheer = () => cheers[getRandomIntInRange(0, cheers.length)];
const handleCheerYouOn = () => {
  console.log(`\n${terminalLineBreak("=")}\n${getCheer()}\n${terminalLineBreak("=")}`);
  prompt(`\n👉 Press any key to go back to the main menu!`);
}

module.exports = {
  welcomeAndGetName,
  showOptions,
  sayGoodbye,
  handleGuessingGame,
  handleWordsOfWisom,
  handleCheerYouOn
}