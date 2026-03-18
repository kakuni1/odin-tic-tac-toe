let tttBoard = {
  // create empty "" 3x3 grid using arrays
  boardGrid: Array(3)
    .fill()
    .map(() => Array(3).fill("")),

  playerA: { name: "A" },
  playerB: { name: "B" },
};

console.log(tttBoard);
