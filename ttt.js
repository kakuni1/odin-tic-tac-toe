let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),

  playerData: [{ name: "playerA" }, { name: "playerB" }],
};

const prompt = require("prompt-sync")();

(function runLogic() {
  let firstPlayer, secondPlayer, firstSymbol, secondSymbol;

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

  function oneMove(player, symbol) {
    // take (1) player's input
    const inputRow = prompt(`${player} (${symbol}), choose array slot (row): `);
    const inputCol = prompt(`${player} (${symbol}), choose array slot (col): `);
    const row = parseInt(inputRow) - 1;
    const col = parseInt(inputCol) - 1;
    tttBoard.boardGrid[row][col] = symbol;
  }

  function repeatMove(firstPlayer, secondPlayer, firstSymbol, secondSymbol) {
    // loop game until exit condition is met
    while (true) {
      oneMove(firstPlayer, firstSymbol);
      printConsole();
      if (checkGameState() === false) {
        break;
      }
      oneMove(secondPlayer, secondSymbol);
      printConsole();
    }
  }

  function checkGameState() {
    // check if game should end, return true if it should
    const exitStatus = tttBoard.boardGrid.some((i) => i.includes(""));
    return exitStatus;
  }

  function printConsole() {
    console.table(tttBoard.boardGrid);
  }

  // run game (main)
  runInitialSetup();
  repeatMove(firstPlayer, secondPlayer, firstSymbol, secondSymbol);
})();
