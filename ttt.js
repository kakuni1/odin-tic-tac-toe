let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),

  playerA: { name: "", symbol: "" },
  playerB: { name: "", symbol: "" },
};

const prompt = require("prompt-sync")();

(function runLogic() {
  (function runInitialSetup() {
    const coinFlip = Math.random();

    // randomly apply symbol, "x" & "o"
    // x, goes first
    if (coinFlip > 0.5) {
      tttBoard.playerA.symbol = "x";
      tttBoard.playerB.symbol = "o";
      tttBoard.playerA.name = "Player 1";
      tttBoard.playerB.name = "Player 2";
    } else {
      tttBoard.playerB.symbol = "x";
      tttBoard.playerA.symbol = "o";
      tttBoard.playerB.name = "Player 1";
      tttBoard.playerA.name = "Player 2";
    }
  })();

  function promptUser() {
    const inputRow = prompt(`${tttBoard.playerA.name} (${tttBoard.playerA.symbol}), choose array slot (row): `);
    const inputCol = prompt(`${tttBoard.playerB.name} (${tttBoard.playerB.symbol}), choose array slot (col): `);
    return { row: parseInt(inputRow) - 1, col: parseInt(inputCol) - 1 };
  }

  function oneMove(symbol) {
    let validMove = false;
    // take (1) player's input

    while (!validMove) {
      const { row, col } = promptUser();
      if (tttBoard.boardGrid[row][col] === "") {
        validMove = true;
        tttBoard.boardGrid[row][col] = symbol;
      }
    }
  }

  function runGame() {
    // loop game until exit condition is met
    while (true) {
      if (exitNow("x") === true) {
        console.log(`WINNER: ${tttBoard.playerA.name}`);
        break;
      }
      if (exitNow("o") === true) {
        console.log(`WINNER: ${tttBoard.playerB.name}`);
        break;
      }
      oneMove("x");
      printConsole();
      if (exitNow("x") === true) {
        console.log(`WINNER: ${tttBoard.playerA.name}`);
        break;
      }
      if (exitNow("o") === true) {
        console.log(`WINNER: ${tttBoard.playerB.name}`);
        break;
      }
      oneMove("o");
      printConsole();
    }
  }

  function exitNow(symbol) {
    const board = tttBoard.boardGrid;

    // check for exit conditions, return true to exit

    // board full
    if (board.some((i) => i.includes("")) === false) {
      console.log("TIE");
      return true;
    }
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
    let whichName = prompt(`Select name -> [1] ${tttBoard.playerA.name}, [2] ${tttBoard.playerA.name}:  `);
    whichName = parseInt(whichName);
    const inputName = prompt(`Enter name: `);
    if (whichName === 1) tttBoard.playerA.name = inputName;
    if (whichName === 2) tttBoard.playerB.name = inputName;
  }

  function printConsole() {
    console.table(tttBoard.playerA);
    console.table(tttBoard.playerB);
    console.table(tttBoard.firstMove);
    console.table(tttBoard.boardGrid);
  }

  // run game (main)
  // runInitialSetup();
  runGame();
  printConsole();
  (function endGame() {
    console.log("GAME END");
  })();
})();
