let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill()
    .map(() => Array(3).fill("")),

  playerData: [
    { name: "playerA", symbol: "", firstMove: false },
    { name: "playerB", symbol: "", firstMove: false },
  ],
};

const prompt = require("prompt-sync")();

const tttLogic = (function logicController() {
  // randomly pick first player, first player symbol: x, second: o
  const setInitialPlayerState = function (playerOne, playerTwo) {
    if ((coinFlip = Math.random() > 0.5)) playerPick = playerOne;
    else playerPick = playerTwo;
    tttBoard.playerData.find((p) => p.name === playerPick).firstMove = true;
    tttBoard.playerData.find((p) => p.name === playerPick).symbol = "x";
    tttBoard.playerData.find((p) => p.symbol === "").symbol = "o";

    const input = prompt("testing input:");
    console.log(`input: ${input}`);
  };

  return {
    setInitialPlayerState: setInitialPlayerState,
  };
})();

const tttDisplay = (function displayController() {
  const printConsole = function () {
    console.table(tttBoard.playerData);
    console.table(tttBoard.boardGrid);
  };

  return { printConsole: printConsole };
})();

(function tttMain() {
  tttLogic.setInitialPlayerState(tttBoard.playerData[0].name, tttBoard.playerData[1].name);
  tttDisplay.printConsole();
})();
