(function runLogic() {
    let tttBoard = {
        // create empty "" 3x3 grid using arrays
        boardGrid: Array(3)
            .fill("")
            .map(() => Array(3).fill("")),

        playerA: { name: "Player 1", symbol: "" },
        playerB: { name: "Player 2", symbol: "" },
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

    function runInitialSetup() {
        const coinFlip = Math.random();

        // randomly apply symbol, "x" & "o"
        // x, goes first
        if (coinFlip > 0.5) {
            tttBoard.playerA.symbol = "x";
            tttBoard.playerB.symbol = "o";
        } else {
            tttBoard.playerB.symbol = "x";
            tttBoard.playerA.symbol = "o";
        }
    }

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

    function openModal() {
        document.getElementById("open-modal").showModal();
    }

    function setupModal() {
        const dialog = document.getElementById("open-modal");
        const openButton = document.getElementById("player-button");
        const closeButton = document.getElementById("close-modal");
        const submitButton = document.getElementById("submit");

        openButton.addEventListener("click", () => {
            dialog.showModal();
        });

        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.close();
        });

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const playerAName = document.getElementById("playerA-name").value.trim() || "Player 1";
            const playerBName = document.getElementById("playerB-name").value.trim() || "Player 2";
            tttBoard.playerA.name = playerAName;
            tttBoard.playerB.name = playerBName;
            printPlayerInfo();
            dialog.close();
        });
    }

    function setupReset() {
        const resetButton = document.getElementById("reset");

        // reset on mouse click
        resetButton.addEventListener("click", () => {
            // clear array
            tttBoard.boardGrid = tttBoard.boardGrid.map((row) => row.map(() => ""));
            tttBoard.gameData.display = "Next: ";
            tttBoard.gameData.winner = "";
            tttBoard.gameData.tie = false;
            tttBoard.gameData.row = 0;
            tttBoard.gameData.col = 0;
            tttBoard.gameData.currentIndex = "";
            tttBoard.gameData.currentSymbol = "x";
            runInitialSetup();
            document.querySelectorAll(".display").forEach((display) => {
                display.textContent = "";
            });
            document.querySelectorAll(".card").forEach((card) => {
                card.style.pointerEvents = "";
            });
            printPlayerInfo();
        });
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
        console.table(tttBoard.boardGrid);
        console.table(tttBoard.gameData);
        console.table(tttBoard.playerA);
        console.table(tttBoard.playerB);
    }

    function getPlayer(symbol) {
        return tttBoard.playerA.symbol === symbol ? tttBoard.playerA : tttBoard.playerB;
    }

    function endGame() {
        document.querySelectorAll(".card").forEach((card) => {
            // game over, disable click
            card.style.pointerEvents = "none";
        });
    }

    (function main() {
        runInitialSetup();
        readyGame();
        setupModal();
        setupReset();
        openModal();
    })();
})();
