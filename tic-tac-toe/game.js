
const statusDisplay = document.querySelector('.move-status');
let gameActive = true;
let currentPlayer = "X";
let gameData = ["", "", "", "", "", "", "", "", ""];

// messages display 
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelector('.restart-btn').addEventListener('click', handleRestartGame);
// document.querySelector('.preview').addEventListener('click', preview);
        // handle Cell Click
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// document.querySelector('.preview').addEventListener('click',previews);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;   /*target the devs of every cell*/
    const clickedCellIndex = parseInt( clickedCell.getAttribute('table-index'));  /* index*/
    if (gameData[clickedCellIndex] !== "" || !gameActive) {
        return;
    }  else  handleCellPlayed(clickedCell, clickedCellIndex);
             handleResultValidation();         
}; 
//  handleCellPlayed
function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameData[clickedCellIndex] = currentPlayer;  /* Saves the value(X||O) in th index  */
        clickedCell.innerHTML = currentPlayer;  /* display O||X of the current value of player*/
        // if(history.length > 0){
        //     history[history.length-1].curentAction = false;
        // }
    //     history.push({
    //       value: currentPlayer,
    //       index: clickedCellIndex,
    //       curentAction: true 
    //   });
    //   console.log(history);
 };
// handleResultValidation
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameData[winCondition[0]];
        let b = gameData[winCondition[1]];
        let c = gameData[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }  
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
// round drow 
let roundDraw = !gameData.includes("");
if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
}

    handlePlayerChange();
}
// handlePlayerChange

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// handleRestartGame
function handleRestartGame() {
    location.reload();
    // gameActive = true;
    // currentPlayer = "X";
    // gameData = ["", "", "", "", "", "", "", "", ""];
    // statusDisplay.innerHTML = currentPlayerTurn();
    // document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}









