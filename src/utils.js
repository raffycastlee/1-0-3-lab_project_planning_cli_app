const prompt = require('prompt-sync')( {sigint: true} );
// -------------------------------------------------------------- //
// ---------------------- HELPER FUNCTIONS ---------------------- // 
// -------------------------------------------------------------- //
const getUserOpt = (type) => {
  let temp;
  // degeneracy
  while (true) { // ok but this makes a lot of sense though
    switch (type) {
      case 'name': 
        temp = (prompt(`👉 `, 'Emanon'));
        // check if valid alphabet name, no spaces
        if (/^[a-zA-Z]+$/.test(temp)) {
          return temp;
        }
        console.log(`Invalid name. (Hint: or hit <ENTER> and see what happens!)`);
        break;
      case 'num':
        temp = Number(prompt(`👉 `, '*'));
        // check if input isNaN
        if (!isNaN(Number(temp))) {
          return temp;
        }
        break;
      case 'menu':
        temp = Number(prompt(`👉 `, '*'));
        // anything is valid for menu!
        return temp;
    }
  }
}

const getRandomIntInRange = (start, end) => {
  return start + Math.floor(Math.random() * end);
}

// maxes out symbols for terminal line breaks
const terminalLineBreak = (char) => {
  return char.repeat(process.stdout.columns-1);
}

// used for animating ellipses in guessingGame
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  getUserOpt,
  getRandomIntInRange,
  terminalLineBreak,
  delay 
}