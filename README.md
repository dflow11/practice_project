# practice_project
# Slot Machine CLI (Node.js)

A 3×3 classic slot machine you play in the command-line terminal! The program features line betting, payout evaluation, bankroll management, and a restartable game session loop.

## Demo

```console
$ node project.js
Enter a deposit amount: 100
Enter the number of lines you would like to bet on (1-3): 3
Enter the bet per line (Cannot exceed balance): 10
 D | B | B
 A | A | A
 C | D | C
Congratulations! You won, $50
Your new balance is 120
Would you like to try again? (y/n): n
Restart Game? (y/n): n
```

## Features
- Weighted reel generation (rarer symbols pay more, can be edited)
- Matrix transposition: column-major reels → row-major paylines for win checks (Brings real slot machine feeling with row-major paylines)
- Robust input validation (bet caps, non-negative balances)
- Restart flow without recursion

## How the program works
- `spin()` builds **columns** (reels) via weighted sampling
- `transpose()` converts reels → rows so we can print & score top/mid/bottom lines
- `getWinnings()` checks each active line and sums payouts using `SYMBOL_VALUES`
- Main game loop handles balance updates and replay prompts

## Odds & payouts (default)
- Symbol counts: A:3, B:4, C:5, D:6 (more copies = more common, which leads to less payout)
- Values: A=5, B=4, C=3, D=2
- Tweak odds in `const SYMBOLS_COUNT` and `const SYMBOL_VALUES` for personal payouts.

## Getting the Project installed
```bash
git clone https://github.com/dflow11/practice_project
cd practice_project
npm install
node project.js
```
