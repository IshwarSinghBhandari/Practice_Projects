let currentPlayer = "X";
let array = Array(9).fill(null);
let gameOver = false;
let winner = {
    player1: 0,
    player2: 0
}

function handleClick(event) {
    const index = event.id;
    if (array[index]) return;
    array[index] = currentPlayer;
    if (gameOver) return;
    event.innerText = currentPlayer;
    event.classList.add(currentPlayer === "X" ? "playerX" : "playerO");
    console.log(currentPlayer === "X" ? "playerX" : "playerO");
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";

}

function checkWin() {

    if (array[0] && array[0] === array[1] && array[1] === array[2] ||
        array[3] && array[3] === array[4] && array[4] === array[5] ||
        array[6] && array[6] === array[7] && array[7] === array[8] ||
        array[0] && array[0] === array[3] && array[3] === array[6] ||
        array[1] && array[1] === array[4] && array[4] === array[7] ||
        array[2] && array[2] === array[5] && array[5] === array[8] ||
        array[0] && array[0] === array[4] && array[4] === array[8] ||
        array[2] && array[2] === array[4] && array[4] === array[6]
    ) {
        gameOver = true;
        document.getElementById("result-text").innerText = `${currentPlayer} wins!`;
        document.getElementById("result").style.display = "flex";
        currentPlayer === "X" ? winner.player1++ : winner.player2++;
        document.getElementById("player1-score").innerText = `Player 1: ${winner.player1}`;
        document.getElementById("player2-score").innerText = `Player 2: ${winner.player2}`;
    }
    else if (!array.includes(null)) {
        console.log("It's a draw!");
        gameOver = true;
        document.getElementById("result-text").innerText = "It's a draw!";
        document.getElementById("result").style.display = "flex";
    }
}

function resetGame() {
    gameOver = false;
    array.fill(null);
    const cells = document.getElementsByClassName("col");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("playerX", "playerO");
    }
    document.getElementById("result").style.display = "none";
    currentPlayer = "X";
}