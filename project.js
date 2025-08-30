// The project that this will be is a javascript slot machine! 
// since js is my most known language, im learning node with this project using prompt-sync and other features in the plan for this project.

/*  1. Deposit some money - COMPLETE !
    2. Determine amount of lines to bet on - COMPLETE !
    3. Collect bet amount - COMPLETE ? I THINK
      All these functions (^^^) follow about the the same order,
      where they have confirmation the user input is a number or else the function will not break the while true loop.
    4. Spin the slot machine
    5. Check if player won
    6. Give the user the winnings.
    7. Play again or Prompt the user they're out of funds.
*/
const prompt = require("prompt-sync")();

function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); // turn string literal into float

    // if user inputs a non number character, we return NaN and ask for a number.
      if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
        return numberDepositAmount;
    }
  }
};

function getNumLines() {
  while (true) {
    const numLines = prompt("Enter the number of lines you would like to bet on (1-3): ");
    const numberNumLines = parseFloat(numLines);

      if (isNaN(numberNumLines) || numberNumLines <= 0 || numberNumLines > 3) {
      console.log("Invalid number of lines, try again.");
    } else {
        return numberNumLines;
    }
  }
};
 
function getBet(balance,lines) {
  while (true) {

    const bet = prompt("Enter the bet per line (Cannot exceed balance): ");
    const numberBet = parseFloat(bet);
    
      if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines) {
      console.log("Invalid bet amount, try again");
    } else {
        return numberBet;
    }
  }
};

let balance = deposit();
const numLines = getNumLines();
const bet = getBet(balance, numLines);