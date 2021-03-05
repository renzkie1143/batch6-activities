const statusDisplay = document.querySelector('.move-status');
let gameActive = true;
let currentPlayer = "X";
let gameData = ["", "", "", "", "", "", "", "", ""];

/** Start new code by Aniez */
let historyTracker = {
    previous: document.querySelector('.previous'),
    next: document.querySelector('.next'),
    boxes: document.querySelectorAll('.cell')
}

const { previous, next, boxes } = historyTracker
let history = []
/** End new code */

const winningMessage = () => `Player ${currentPlayer} has won!`;    // Pwede nani sya regular string declaration, dili function, i.e, const winningMessage = `Player ${currentPlayer} has won!`
const drawMessage = () => `Game ended in a draw!`;                  // Pwede nani sya regular string declaration, dili function, i.e, const drawMessage = `Game ended in a draw!`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;     // Pwede nani sya regular string declaration, dili function, i.e, const currentPlayerTurn = `It's ${currentPlayer}'s turn`
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelector('.restart-btn').addEventListener('click', handleRestartGame);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

/** Start of additional code */
previous.addEventListener('click', () => {
    let lastActionIndex = history.findIndex(item => item.currentAction === true)

    if (lastActionIndex > -1) {
        if (lastActionIndex > 0) history[lastActionIndex-1].currentAction = true
        
        history[lastActionIndex].currentAction = false
        boxes[history[lastActionIndex].index].innerHTML = ''

        lastActionIndex = history.findIndex(item => item.currentAction === true)

        disableButton()
    }
})

next.addEventListener('click', () => {
    let currentActionIndex = history.findIndex(item => item.currentAction === true)

    if (currentActionIndex > -1) {
        if (currentActionIndex == history.length-1) return 
        if (currentActionIndex <= history.length-2) history[currentActionIndex+1].currentAction = true

        history[currentActionIndex].currentAction = false
        currentActionIndex = history.findIndex(item => item.currentAction === true)

        if (currentActionIndex > -1) boxes[history[currentActionIndex].index].innerHTML = history[currentActionIndex].inputValue
    } else {
        history[0].currentAction = true
        boxes[history[0].index].innerHTML = history[0].inputValue
    }

    disableButton()
})

let disableButton = () => {
    let currentAction = history.findIndex(item => item.currentAction == true)
    
    if (currentAction > 0 && currentAction < history.length-1) {
        previous.disabled = false
        next.disabled = false
    } else {
        if (currentAction === -1) {
            previous.disabled = true
            next.disabled = false
        } else if (currentAction == history.length-1) {
            next.disabled = true
            previous.disabled = false
        }
    }
}
/** End of additional code */

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;   /*target the devs of every cell*/
    const clickedCellIndex = parseInt( clickedCell.getAttribute('table-index'));  /* index*/
    if (gameData[clickedCellIndex] !== "" || !gameActive) {
        return;
    } else {
        handleCellPlayed(clickedCell, clickedCellIndex);
    }
    
    handleResultValidation();         
}; 

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameData[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    /** Start of additional code */
    history.length > 0 ? history.map(item => item.currentAction = false) : history  /** Checking if history array is empty or not, if it's not empty, change the value for all currentAction keys to false */
    
    /** Insert new data telling the history array that this is the current action by setting the value for currentAction to true */
    history = [...history, {
        index: clickedCellIndex,
        currentAction: true,
        inputValue: currentPlayer
    }]
    /** End of additional code */
 };

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
        } if (a === b && b === c) {
            /** Start of additional code */
            previous.style.display = 'block'
            next.style.display = 'block'
            next.disabled = true
            /** End of additional code */

            roundWon = true;
            break
        }  
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    
    let roundDraw = !gameData.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    location.reload();
}