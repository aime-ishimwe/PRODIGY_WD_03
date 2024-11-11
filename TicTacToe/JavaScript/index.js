const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const btnRestart = document.querySelector("#btnRestart");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;
let gameMode = "PvP"; // Default to Player vs Player

initializeGame();

// Function to initialize the game
function initializeGame(){
    // Mode buttons
    document.querySelector("#playerVsPlayer").addEventListener("click", () => setGameMode("PvP"));
    document.querySelector("#playerVsComputer").addEventListener("click", () => setGameMode("PvC"));

    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    btnRestart.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

// Function to set the game mode
function setGameMode(mode) {
    gameMode = mode;
    options = ["","","","","","","","",""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

    // Hide the game mode buttons once a mode is selected
    document.querySelector("#gameMode").style.display = "none";
}

// Function to handle what happens when a cell is clicked
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] !== "" || !running || (currentPlayer === "O" && gameMode === "PvC")){
        return; // Prevent the player from clicking while it's the computer's turn
    }
    updateCell(this, cellIndex);
    if (!checkWinner()) {
        changePlayer();
        if (gameMode === "PvC" && running && currentPlayer === "O") {
            setTimeout(computerMove, 500); // Simulate computer thinking
        }
    }
}

// Function to update the cell after it's been clicked
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Function to change to the next player after each turn
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

// Function to determine if there is a winner or if it's a draw
function checkWinner(){
    let roundWon = false;
    for( let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        
        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        return true;
    }
    else if (!options.includes("")){
        statusText.textContent = `Draw`;
        running = false;
        return true;
    }
    return false;
}

// Function to make a move for the computer (PvC)
function computerMove() {
    // Get the list of available cells
    const availableCells = options.reduce((acc, val, index) => {
        if (val === "") acc.push(index);
        return acc;
    }, []);

    // Randomly select one of the available cells for the computer
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    options[randomCell] = "O"; // Computer's mark
    cells[randomCell].textContent = "O";

    // Check if the computer won
    if (!checkWinner()) {
        changePlayer(); // Switch turn back to the player
    }
}

// Function to restart the game when the restart button is pressed
function restartGame(){
    options = ["","","","","","","","",""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

    // Show the game mode buttons again when the game is restarted
    document.querySelector("#gameMode").style.display = "flex";
}
