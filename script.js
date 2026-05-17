const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e){

  const clickedCell = e.target;

  const index = clickedCell.getAttribute("data-index");

  if(gameState[index] !== "" || !gameActive){
    return;
  }

  gameState[index] = currentPlayer;

  clickedCell.textContent = currentPlayer;

  clickedCell.classList.add(currentPlayer.toLowerCase());

  checkWinner();
}

function checkWinner(){

  let roundWon = false;

  for(let i = 0; i < winningConditions.length; i++){

    const [a,b,c] = winningConditions[i];

    if(
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ){
      roundWon = true;
      break;
    }
  }

  if(roundWon){

    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;

    winnerText.textContent =
      `🏆 Player ${currentPlayer} Wins!`;

    popup.style.display = "flex";

    gameActive = false;

    return;
  }

  if(!gameState.includes("")){

    statusText.textContent = "It's a Draw!";

    winnerText.textContent =
      "🤝 It's a Draw!";

    popup.style.display = "flex";

    gameActive = false;

    return;
  }

  currentPlayer =
    currentPlayer === "X" ? "O" : "X";

  statusText.textContent =
    `Player ${currentPlayer} Turn`;
}

function restartGame(){

  currentPlayer = "X";

  gameActive = true;

  gameState = ["", "", "", "", "", "", "", "", ""];

  statusText.textContent = "Player X Turn";

  popup.style.display = "none";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove("x", "o");

  });
}

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});
