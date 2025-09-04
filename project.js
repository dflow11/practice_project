const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
  "A" : 3, "B" : 4, "C" : 5,"D" : 6
}

const SYMBOL_VALUES = {
  "A" : 5, "B" : 4, "C" : 3, "D" : 2
}

function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); 

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
    const numberNumLines = parseInt(numLines);

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


function spin() {
  const symbols = []; 
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
      for (let i = 0; i < count; i++) {
        symbols.push(symbol);
      }
  }
  
  const reels = [[], [], []];
  for (let i = 0; i < COLUMNS; i++) {
      const tempReelSymbols = [...symbols];
    for(let j = 0; j < ROWS; j++) {
        const random = Math.floor(Math.random() * tempReelSymbols.length);
        const selectedSymbol = tempReelSymbols[random];
        reels[i].push(selectedSymbol);
        tempReelSymbols.splice(random, 1);
    }
  }

  return reels;
};


function transpose(reels) {
  const rows = [];


  for (let i = 0; i< ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUMNS ; j++) {
      rows[i].push(reels[j][i])
    }
  }

  return rows
};

function printRows(rows) {
  for (const row of rows) {
    let rowString = " ";
    for (const [i,symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length -1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

function getWinnings (rows, bets, lines) {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    const first = symbols[0];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != first) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bets * SYMBOL_VALUES[first];
    }
  }

  return winnings;
};

function game() {
  let balance = deposit();

  while (true) {
    const numLines = getNumLines();
    const bet = getBet(balance, numLines);
    const totalBet = bet * numLines
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numLines);

    if (winnings > 0) {
      console.log("Congratulations! You won, $" + winnings);
    } else {
      console.log("Unfortunately, you did not win.");
    }
    balance = balance - totalBet + winnings;
    console.log("Your new balance is " + balance);

    if (balance <= 0) {
      console.log("Out of funds!");
      return;
    }
  
    const continueGame = prompt("Would you like to try again? (y/n): ");
    if (continueGame.toLowerCase() != "y") return;
    }
};

function main() {
  while (true) {
    game();
    const again = prompt("Restart Game? (y/n): ");
    if (again.trim().toLowerCase() != "y") break;
  }
}

main();