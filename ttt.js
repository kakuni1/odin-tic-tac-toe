let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),

  playerData: [{ name: "playerA" }, { name: "playerB" }],
};

const prompt = require("prompt-sync")();

(function runLogic() {
  function runInitialSetup() {
    // randomly pick first player, first player symbol: x, second: o
    const coinFlip = Math.random();
    if (coinFlip > 0.5) {
      // playerA, first
      firstPlayer = "playerA";
      secondPlayer = "playerB";
      firstSymbol = "x";
      secondSymbol = "o";
    } else {
      // playerB, first
      firstPlayer = "playerB";
      secondPlayer = "playerA";
      firstSymbol = "o";
      secondSymbol = "x";
    }
  }
  function makeMove(player, symbol) {
    // prompt for array position selection (row, col)
    const inputRow = prompt(`${player} (${symbol}), choose array slot (row): `);
    const inputCol = prompt(`${player} (${symbol}), choose array slot (col): `);
    const row = parseInt(inputRow) - 1;
    const col = parseInt(inputCol) - 1;
    tttBoard.boardGrid[row][col] = symbol;
  }

  runInitialSetup();
  makeMove(firstPlayer, firstSymbol);
  makeMove(secondPlayer, secondSymbol);
})();

(function printConsole() {
  console.table(tttBoard.boardGrid);
})();
