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

  function promptUser(player, symbol) {
    const inputRow = prompt(`${player} (${symbol}), choose array slot (row): `);
    const inputCol = prompt(`${player} (${symbol}), choose array slot (col): `);
    return { row: parseInt(inputRow) - 1, col: parseInt(inputCol) - 1 };
  }

  function oneMove(player, symbol) {
    // take (1) player's input
    const { row, col } = promptUser(player, symbol);
    if (tttBoard.boardGrid[row][col] === "") tttBoard.boardGrid[row][col] = symbol;
  }

  function repeatMove(firstPlayer, secondPlayer, firstSymbol, secondSymbol) {
    // loop game until exit condition is met
    while (true) {
      if (exitNow() === true) break;
      oneMove(firstPlayer, firstSymbol);
      printConsole();
      if (exitNow() === true) break;
      oneMove(secondPlayer, secondSymbol);
      printConsole();
    }
  }

  function exitNow() {
    const board = tttBoard.boardGrid;

    // check for exit conditions, return true to exit

    // board full
    if (board.some((i) => i.includes("")) === false) return true;
    // row check
    if (board[0][0] !== "" && board[0][0] === board[0][1] && board[0][1] === board[0][2]) return true;
    if (board[1][0] !== "" && board[1][0] === board[1][1] && board[1][1] === board[1][2]) return true;
    if (board[2][0] !== "" && board[2][0] === board[2][1] && board[2][1] === board[2][2]) return true;
    // column check
    if (board[0][0] !== "" && board[0][0] === board[1][0] && board[1][0] === board[2][0]) return true;
    if (board[0][1] !== "" && board[0][1] === board[1][1] && board[1][1] === board[2][1]) return true;
    if (board[0][2] !== "" && board[0][2] === board[1][2] && board[1][2] === board[2][2]) return true;
    // diagnol check
    if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
    if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;

    // if no exit condition, return false to resume
    return false;
  }

  function printConsole() {
    console.table(tttBoard.boardGrid);
  }

  // run game (main)
  runInitialSetup();
  repeatMove(firstPlayer, secondPlayer, firstSymbol, secondSymbol);
})();
