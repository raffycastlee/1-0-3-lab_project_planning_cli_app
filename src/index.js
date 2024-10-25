const prompt = require('prompt-sync')( {signint: true} );

const welcomeAndGetName = () => {
  // todo maybe name validation? if needed?
  console.log("Hello there!\n------------------------------");
  console.log("Would you mind telling me your name?");
  return prompt("👉 ", "Emanon").trim();
}

const showOptions = () => {
  console.log(`-----------------------------`);
  console.log("Here's your options:");
  console.log(`1 - play a guessing game`);
  console.log(`2 - words of wisdom`);
  console.log(`3 - cheer you on`);
  console.log(`* - exit\n`);
}

const sayGoodbye = (name) => {
  console.log(`\n-----------------------------\nGoodbye, ${name}\n-----------------------------!\n`);
}

const getUserOpt = () => {
  // todo validation
  // can we do different validation schemes
  //   for when it's menu VS guessing usage?
  return Number(prompt(`👉 `, '*'));
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handleGuessingGame = async () => {
  process.stdout.write("\nLet me think of a number");
  for (let i=0; i < 3; i++) {
    await delay(1000);
    process.stdout.write(".");
  }

  await delay(500);
  console.log(`\n\nHere's the rules:\nYou get a total of five (5) guesses, and I WILL count repeat guesses against you!\n`);
  await delay(500)
  console.log(`Alrighty, guess away!\n(It's a number from 1 to 10!)\n`);

  const randNum = 1 + Math.floor(Math.random() * 10);
  let numGuesses = 5;
  let userNum = getUserOpt();
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
      console.log("\nToo bad... You're all out of guesses!")
      return;
    }
    // more guesses
    console.log(`\nNope, that's not it. ${numGuesses} left!\n`)
    userNum = getUserOpt();
  }

  // if user guessed right
  if (numGuesses == 0) {
    console.log("\nThat's cutting it too close with zero (0) guesses left... You still got it though!");
  } else if (numGuesses == 4) {
    console.log(`\nLuck might just be on your side today... You did it in the first try!`);
  } else {
    console.log(`\nWow, you actually did it! And with ${numGuesses} guesses left to boot.`);
  }
}

const main = async () => {
  const name = welcomeAndGetName();
  console.log(`\nHello ${name}, nice to meet you!`);
  showOptions();
  const userOpt = getUserOpt();
  switch (userOpt) {
    case 1:
      await handleGuessingGame();
      break;
    // case 2:
    //   handleWordsOfWisom();
    //   break;
    // case 3:
    //   handleCheerYouOn();
    //   break;
  }
  sayGoodbye(name);
}

main();