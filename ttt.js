(function runLogic() {
    let tttBoard = {
        // create empty "" 3x3 grid using arrays
        boardGrid: Array(3)
            .fill("")
            .map(() => Array(3).fill("")),

        playerA: { name: "", symbol: "" },
        playerB: { name: "", symbol: "" },
        gameData: {
            row: 0,
            col: 0,
            currentIndex: "",
            currentSymbol: "x",
            display: "Next: ",
            winner: "",
            tie: false,
        },
    };

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
            tttBoard.playerB.name = "Player 2";
            tttBoard.playerA.name = "Player 1";
        }
    })();

    function readyGame() {
        printPlayerInfo();
        document.querySelectorAll(".card").forEach((card, index) => {
            card.addEventListener("click", () => {
                tttBoard.gameData.currentIndex = index;
                tttBoard.gameData.row = Math.floor(index / 3);
                tttBoard.gameData.col = index % 3;
                checkMove();
            });
        });
    }

    function checkMove() {
        const row = tttBoard.gameData.row;
        const col = tttBoard.gameData.col;
        const index = tttBoard.gameData.currentIndex;
        const symbol = tttBoard.gameData.currentSymbol;
        const card = document.querySelectorAll(".card");
        const currentCard = card[index];
        const currentText = currentCard.querySelector(".display");

        if (tttBoard.boardGrid[row][col] === "") {
            tttBoard.boardGrid[row][col] = symbol;
            currentText.textContent = symbol;

            const gameOver = checkExit(symbol);

            if (gameOver) {
                endGame();
                if (tttBoard.gameData.winner) {
                    tttBoard.gameData.display = "Winner: " + tttBoard.gameData.winner;
                    tttBoard.gameData.currentSymbol = "";
                    printPlayerInfo();
                } else {
                    tttBoard.gameData.display = "Tie";
                    tttBoard.gameData.currentSymbol = "";
                    printPlayerInfo();
                }
                return;
            }

            switchSymbol();
            printPlayerInfo();
        } else {
            currentText.style.color = "#B5514A";
            currentCard.style.borderColor = "#B5514A";
            currentCard.style.borderWidth = "0.225rem";
            setTimeout(() => {
                currentText.style.color = "";
                currentCard.style.borderWidth = "";
            }, 500);
        }
    }

    function checkExit(symbol) {
        const board = tttBoard.boardGrid;

        // check for exit conditions, return true to exit

        if (
            // row check
            (board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol) ||
            (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol) ||
            (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol) ||
            // column check
            (board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol) ||
            (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol) ||
            (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol) ||
            // diagonal check
            (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
            (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
        ) {
            tttBoard.gameData.winner = getPlayer(symbol).name;
            return true;
        }

        // board full
        if (board.some((i) => i.includes("")) === false) {
            tttBoard.gameData.tie = true;
            return true;
        }

        // if no exit condition, return false to resume
        return false;
    }

    function switchSymbol() {
        if (tttBoard.gameData.currentSymbol === "x") {
            tttBoard.gameData.currentSymbol = "o";
        } else {
            tttBoard.gameData.currentSymbol = "x";
        }
    }

    function printPlayerInfo() {
        document.getElementById("player-status").textContent =
            `${tttBoard.playerA.name}: ${tttBoard.playerA.symbol}\n${tttBoard.playerB.name}: ${tttBoard.playerB.symbol}
      \n${tttBoard.gameData.display}${tttBoard.gameData.currentSymbol}`;
        console.table(tttBoard.gameData);
    }

    function getPlayer(symbol) {
        return tttBoard.playerA.symbol === symbol ? tttBoard.playerA : tttBoard.playerB;
    }

    function endGame() {
        document.querySelectorAll(".card").forEach((card) => {
            card.style.pointerEvents = "none";
        });
    }

    (function main() {
        readyGame();
    })();
})();
