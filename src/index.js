const { getUserOpt } = require('./utils.js');
const {
  welcomeAndGetName,
  showOptions,
  sayGoodbye,
  handleGuessingGame,
  handleWordsOfWisom,
  handleCheerYouOn
} = require('./handlers.js')

const main = async () => {
  const name = welcomeAndGetName();
  console.log(`\nHello ${name}, nice to meet you!`);
  let userOpt;
  let flag = 0;
  while (++flag) {
    if (flag > 1) {
      console.log(`\nWelcome back, ${name}.`);
    }
    showOptions();
    userOpt = getUserOpt('menu');
    switch (userOpt) {
      case 1:
        // has to be async because of the ellipses animation
        await handleGuessingGame();
        break;
      case 2:
        handleWordsOfWisom();
        break;
      case 3:
        handleCheerYouOn();
        break;
      default:
        // quit flag
        flag = -1;
        break;
    }
  }
  sayGoodbye(name);
}

main();