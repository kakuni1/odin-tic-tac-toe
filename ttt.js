let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill()
    .map(() => Array(3).fill("")),

  playerData: [
    { name: "playerA", symbol: "" },
    { name: "playerB", symbol: "" },
  ],

  tttLogicController() {
    const getPlayerSymbol = function (playerName) {
      const player = this.playerData.find((p) => p.name === playerName);
      return prompt(`${player.name}:`);
    }.bind(this);

    const setPlayerSymbol = function (playerName) {
      const player = this.playerData.find((p) => p.name === playerName);
      return (player.symbol = getPlayerSymbol(playerName));
    }.bind(this);

    const setInitialPlayerState = function () {
      this.playerData[0].symbol = setPlayerSymbol(this.playerData[0].name);
      this.playerData[1].symbol = setPlayerSymbol(this.playerData[1].name);
    }.bind(this);

    return {
      getPlayerSymbol: getPlayerSymbol,
      setPlayerSymbol: setPlayerSymbol,
      setInitialPlayerState: setInitialPlayerState,
    };
  },

  tttDisplayController() {
    const printConsole = function () {
      console.table(this.playerData);
      console.table(this.boardGrid);
    }.bind(this);

    return { printConsole: printConsole };
  },
};

tttBoard.tttLogicController().setInitialPlayerState();
tttBoard.tttDisplayController().printConsole();
