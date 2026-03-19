let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill()
    .map(() => Array(3).fill("")),

  playerData: [
    { name: "playerA", symbol: "" },
    { name: "playerB", symbol: "" },
  ],
};

const tttLogic = (function logicController() {
  const getPlayerSymbol = function (playerName) {
    const player = tttBoard.playerData.find((p) => p.name === playerName);
    return prompt(`${player.name}:`);
  };

  const setPlayerSymbol = function (playerName) {
    const player = tttBoard.playerData.find((p) => p.name === playerName);
    return (player.symbol = getPlayerSymbol(playerName));
  };

  const setInitialPlayerState = function () {
    tttBoard.playerData[0].symbol = setPlayerSymbol(tttBoard.playerData[0].name);
    tttBoard.playerData[1].symbol = setPlayerSymbol(tttBoard.playerData[1].name);
  };

  return {
    getPlayerSymbol: getPlayerSymbol,
    setPlayerSymbol: setPlayerSymbol,
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
  tttLogic.setInitialPlayerState();
  tttDisplay.printConsole();
})();
