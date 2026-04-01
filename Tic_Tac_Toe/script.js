let currentPlayer = "X";
let array = Array(9).fill(null);
let gameOver = false;

function handleClick(event) {
    console.log(currentPlayer)
    const index = event.id;
    if (array[index]) return;
    array[index] = currentPlayer;
    console.log(gameOver)
    if (gameOver) return;
    event.innerText = currentPlayer;

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
        console.log(currentPlayer + " wins!");
        gameOver = true;
        document.getElementById("result-text").innerText = `${currentPlayer} wins!`;
        document.getElementById("result").style.display = "flex";
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
    }
    document.getElementById("result").style.display = "none";
    currentPlayer = "X";
}