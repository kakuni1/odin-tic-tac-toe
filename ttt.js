let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),

  playerA: { name: "", symbol: "", firstMove: false },
  playerB: { name: "", symbol: "", firstMove: false },
  gameData: { winnerName: "", gameTie: false },
};

const prompt = require("prompt-sync")();

(function runLogic() {
  (function runInitialSetup() {
    const coinFlip = Math.random();

    // randomly apply symbol, "x" & "o"
    // x, goes first
    if (coinFlip > 0.5) {
      tttBoard.playerA.firstMove = true;
      tttBoard.playerA.symbol = "x";
      tttBoard.playerB.symbol = "o";
      tttBoard.playerA.name = "Player 1";
      tttBoard.playerB.name = "Player 2";
    } else {
      tttBoard.playerB.firstMove = true;
      tttBoard.playerB.symbol = "x";
      tttBoard.playerA.symbol = "o";
      tttBoard.playerB.name = "Player 1";
      tttBoard.playerA.name = "Player 2";
    }
  })();

  function runGame() {
    // loop game until exit condition is met
    while (true) {
      oneMove("x");
      if (exitNow("x") === true) {
        tttBoard.gameData.winnerName = tttBoard.playerA.name;
        break;
      }
      oneMove("o");
      if (exitNow("o") === true) {
        tttBoard.gameData.winnerName = tttBoard.playerB.name;
        break;
      }
    }
  }

  function oneMove(symbol) {
    let validMove = false;
    // take (1) player's input

    while (!validMove) {
      const { row, col } = promptUser(symbol);
      if (tttBoard.boardGrid[row][col] === "") {
        validMove = true;
        tttBoard.boardGrid[row][col] = symbol;
        printConsole();
      }
    }
  }

  function exitNow(symbol) {
    const board = tttBoard.boardGrid;

    // check for exit conditions, return true to exit

    // board full
    if (board.some((i) => i.includes("")) === false) {
      tttBoard.gameData.gameTie = true;
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
    // diagonal check
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

    // if no exit condition, return false to resume
    return false;
  }

  function promptUser(symbol) {
    const inputName = tttBoard.playerA.symbol === symbol ? tttBoard.playerA.name : tttBoard.playerB.name;
    const inputRow = prompt(`${inputName} (${symbol}), choose row (0-2): `);
    const inputCol = prompt(`${inputName} (${symbol}), choose col (0-2): `);
    return { row: parseInt(inputRow), col: parseInt(inputCol) };
  }

  function nameChange() {
    let whichName = prompt(`Select name -> [1] ${tttBoard.playerA.name}, [2] ${tttBoard.playerB.name}:  `);
    whichName = parseInt(whichName);
    const inputName = prompt(`Enter name: `);
    if (whichName === 1) tttBoard.playerA.name = inputName;
    if (whichName === 2) tttBoard.playerB.name = inputName;
  }

  function printConsole() {
    console.table(tttBoard.boardGrid);
    if (tttBoard.gameData.gameTie === true) console.log(`TIE!`);
  }

  (function main() {
    runGame();
  })();
})();
