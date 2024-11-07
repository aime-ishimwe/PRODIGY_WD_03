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

initializeGame();

//function to begin the game 
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    btnRestart.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}


//function to handle what hapens when a cell is clicked
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

//fuction to update the cell after its been clicked
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

//function to change to next player after each turn
function changePlayer(){
    currentPlayer = (currentPlayer=="X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}


//function to determine if there is a  winner is or if its a draw
function checkWinner(){
    let roundWon = false;
    for( let i=0; i<winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        // const cellA = options[condition[0]];
        // const cellA = options[condition[0]];
        if(cellA == "" || cellB ==  "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB ==  cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent =  `${currentPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent =  `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }
}


//function to restart the game when the restat button is pressed
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

