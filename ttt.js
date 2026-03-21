let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),

  playerOne: { name: "Player 1" },
  playerTwo: { name: "Player 2" },
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
    let validMove = false;
    // take (1) player's input

    while (!validMove) {
      const { row, col } = promptUser(player, symbol);
      if (tttBoard.boardGrid[row][col] === "") {
        validMove = true;
        tttBoard.boardGrid[row][col] = symbol;
      }
    }
  }

  function runGame(firstPlayer, secondPlayer, firstSymbol, secondSymbol) {
    // loop game until exit condition is met
    while (true) {
      if (exitNow("x") === true) {
        console.log(`WINNER: ${tttBoard.playerOne.name}`);
        break;
      }
      if (exitNow("o") === true) {
        console.log(`WINNER: ${tttBoard.playerTwo.name}`);
        break;
      }
      oneMove(firstPlayer, firstSymbol);
      printConsole();
      if (exitNow("x") === true) {
        console.log(`WINNER: ${tttBoard.playerOne.name}`);
        break;
      }
      if (exitNow("o") === true) {
        console.log(`WINNER: ${tttBoard.playerTwo.name}`);
        break;
      }
      oneMove(secondPlayer, secondSymbol);
      printConsole();
    }
  }

  function exitNow(symbol) {
    const board = tttBoard.boardGrid;

    // check for exit conditions, return true to exit

    // board full
    if (board.some((i) => i.includes("")) === false) return true;
    // row check
    if (board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol) return true;
    if (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol) return true;
    if (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol) return true;
    // column check
    if (board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol) return true;
    if (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol) return true;
    if (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol) return true;
    // diagnol check
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

    // if no exit condition, return false to resume
    return false;
  }

  function nameChange() {
    let whichName = prompt(`Select name -> [1] ${tttBoard.playerOne.name}, [2] ${tttBoard.playerTwo.name}:  `);
    whichName = parseInt(whichName);
    const inputName = prompt(`Enter name: `);
    if (whichName === 1) tttBoard.playerOne.name = inputName;
    if (whichName === 2) tttBoard.playerTwo.name = inputName;
  }

  function printConsole() {
    console.table(tttBoard.boardGrid);
  }

  // run game (main)
  runInitialSetup();
  runGame(firstPlayer, secondPlayer, firstSymbol, secondSymbol);
  (function endGame() {
    console.log("GAME END");
  })();
})();
