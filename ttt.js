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
      playerSymbol = "x";
    } else {
      // playerB, first
      firstPlayer = "playerB";
      playerSymbol = "o";
    }
  }
  function makeMove(player, symbol) {
    const inputRow = prompt(`${player} (${symbol}), choose array slot (row): `);
    const inputCol = prompt(`${player} (${symbol}), choose array slot (col): `);
    const row = parseInt(inputRow) - 1;
    const col = parseInt(inputCol) - 1;
    tttBoard.boardGrid[row][col] = symbol;
  }

  runInitialSetup();
  makeMove(firstPlayer, playerSymbol);
})();

(function printConsole() {
  console.table(tttBoard.boardGrid);
})();
