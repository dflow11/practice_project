// The project that this will be is a javascript slot machine! 
// since js is my most known language, im learning node with this project using prompt-sync and other features in the plan for this project.

/*  1. Deposit some money - COMPLETE !
    2. Determine amount of lines to bet on - COMPLETE !
    3. Collect bet amount - COMPLETE !
      All these functions (^^^) follow about the the same order,
      where they have confirmation the user input is a number or else the function will not break the while true loop.

    4. Spin the slot machine - COMPLETE !
    5. Check if player won - COMPLETE !
    6. Give the user the winnings - COMPLETE !
    7. Play again or Prompt the user they're out of funds - COMPLETE !
*/
const prompt = require("prompt-sync")();

// 3x3 grid, old school slot style, not the new crazy las vegas machines.
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

/**
 *  - Making a note to fully comprehend function / process. 
 * spin()
 * Builds the slot outcome as 3 vertical reels (columns).
 *
 * How it works:
 * 1) Creates a weighted pool of symbols from SYMBOLS_COUNT (more copies = more common).
 * 2) For each column:
 *    - Copy the full pool of symbols to keep each reel independent.
 *    - Randomly pick ROWS times, so in this case 3 per column, from that pool, removing the picked symbol each time
 *      (sampling without replacement per column).
 * 3) Return a column-major 2D array: reels[colIndex][rowIndex].
 *
 * Example for this 3x3 style grid (COLUMNS=3, ROWS=3):
 * [
 *   ['A','B','D'], // column 1 (top→bottom)
 *   ['C','B','A'], // column 2
 *   ['C','D','C']  // column 3
 * ]
 */

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

/**
 *  - Making a note to fully comprehend function / process. 
 * transpose(reels)
 * Converts column-major data (reels) into row-major lines for display & payouts.
 *
 * Given reels[col][row], the function produces rows[row][col] so we can:
 * - Print the horizontal lines cleanly.
 * - Evaluate the player's bets line-by-line (top, middle, bottom).
 *
 * So it turns, for example:
 * reels = [
 *   ['A','B','D'],
 *   ['C','B','A'],
 *   ['C','D','C']
 * ]
 * 
 * Into:
 * 
 * rows = [
 *   ['A','C','C'], // top row (left→right)
 *   ['B','B','D'], // middle row
 *   ['D','A','C']  // bottom row
 * ]
 */

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