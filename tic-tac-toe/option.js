const statusDisplay = document.querySelector(".move-status");
document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", handleCellClick));
document.querySelector(".restart-btn").addEventListener("click", handleRestartGame);
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let occupiedCells = 0;
let gameActive = true;
let currentPlayer = "X";
let gameState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];



let moves = [];
let counter = 0;
var currentMove;
const cells = document.querySelectorAll(".cell")
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
​
statusDisplay.innerHTML = currentPlayerTurn();
​
function handleCellPlayed(clickedCell, splitValue) {
  gameState[splitValue[0]][splitValue[1]] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}
​
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
​
function handleResultValidation() {
    let roundWon = false;
    for (let row=0; row<gameState.length; row++) {
      let a = gameState[row][0];
      let b = gameState[row][1];
      let c = gameState[row][2];
      if (a != "" && a===b && b===c) {
        roundWon = true;
          break
      }
  }
​
  for (let column=0; column<gameState.length; column++) {
    let a = gameState[0][column];
    let b = gameState[1][column];
    let c = gameState[2][column];
    if (a != "" && a===b && b===c) {
      roundWon = true;
        break
    }
}
​
for (let row=0; row<gameState.length; row++) {
  for (let column=0; column<gameState.length; column++) {
      if(gameState[row][column] !== "") {
          occupiedCells += 1
      }
  }
}
if (occupiedCells === 9) {
  let entry = JSON.parse(JSON.stringify(gameState));
  moves.push(entry);
  currentMove = moves.length - 1;
  previous.style.visibility = "visible"
  next.style.visibility = "visible"
  statusDisplay.innerHTML = drawMessage();
  gameActive = false;
  return;
} else {
  occupiedCells = 0;
}
​
let a = gameState[0][0];
let b = gameState[1][1];
let c = gameState[2][2];
  if(a != "" && a===b && b===c) {
   
    roundWon = true;
  } else {
    let a = gameState[0][2];
    let b = gameState[1][1];
    let c = gameState[2][0];
    if(a != "" && a===b && b===c) {
              roundWon = true
            }
          }
    if (roundWon) {
      currentMove = moves.length;
      let entry = JSON.parse(JSON.stringify(gameState));
      moves.push(entry);
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      previous.style.visibility = "visible"
      next.style.visibility = "visible"
      return;
  }
​
  handlePlayerChange();
};
​
​
function handleCellClick(clickedCellEvent) {
  counter += 1
  let entry = JSON.parse(JSON.stringify(gameState));
  moves.push(entry);
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = clickedCell.getAttribute("data-cell-index");
  const splitValue = clickedCellIndex.split("-");
  if (gameState[splitValue[0]][splitValue[1]] !== "" || !gameActive) {
    return ;
  }
​
  handleCellPlayed(clickedCell, splitValue);
  handleResultValidation();
}
​
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = gameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  moves = [];
  previous.style.visibility = "hidden"
  next.style.visibility = "hidden"
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
​
function previousButton() {
  currentMove--;
  console.log(moves[currentMove]);
  if (currentMove <= 0) {
    currentMove = 0;
}
traverseHistory(moves[currentMove]);
}
​
if (moves === 0){
  console.log("Last Move");
}
​
function nextButton() {
  currentMove++;
  console.log(moves[currentMove]);
  if (currentMove >= moves.length - 1) {
    currentMove = moves.length - 1;
  }
  traverseHistory(moves[currentMove]);
}
​
function traverseHistory(arr) {
  for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
          if (i === 0) {
              if (arr[i][j] === "X") {
                  cells[i+j].innerHTML = "X"; 
              }
              else if (arr[i][j] === "O") {
                  cells[i+j].innerHTML = "O";
              }
              else {
                  cells[i+j].innerHTML = "";   
              }
          }
​
          else if (i === 1) {
              if (arr[i][j] === "X") {
                  cells[i+j+2].innerHTML = "X"; 
              }
              else if (arr[i][j] === "O") {
                  cells[i+j+2].innerHTML = "O";
              }
              else {
                  cells[i+j+2].innerHTML = "";   
              }
          }
​
          else {
              if (arr[i][j] === "X") {
                  cells[i+j+4].innerHTML = "X"; 
              }
              else if (arr[i][j] === "O") {
                  cells[i+j+4].innerHTML = "O";
              }
              else {
                  cells[i+j+4].innerHTML = "";   
              }
          }
      }
  }
