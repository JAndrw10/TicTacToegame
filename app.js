
// get all cells indidivually, query selector)
let cells = document.querySelectorAll(".row > div");

//global variable
// set to global so you can switch between x and o
let player = "X";
let gameWon = false;
let tieGame = false;
let turnCount = 0;
let winText = document.getElementById('win-text')
let button = `<button id='restart-btn' onClick={window.location.reload()}>Play Again?</button>`

let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


//whenever any cell is clicked inside of the board,
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}


// function we want to run after the click above
//console.log(e.target) inside tells the browser i want to do something with this specific html element i just clicked
function cellClicked(e) {
    let cell = e.target

    if (cell.textContent !== "" && !gameWon ) return;//if cell content is not empty return, prevents players from switching once cell has been filled with either letter

    cell.textContent = player; //should be functionality to when you click a cell the x appears in the cell.

    checkWin();


    if (gameWon !== true && turnCount === 8) {
        tieGame = true
        gameDraw()
    }



    switchPlayers();
}


//write function to switch players
function switchPlayers() {
    if (player === "X") {
        player = "O" //redefine to o after they click
    } else {
        player = "X"
    }

    turnCount++;
}



// use a nested for loop for gaining access to each character in each 
function checkWin() {
    for (let i = 0; i < winningCombos.length; i++) {
        let oneCombo = winningCombos[i];//for each individual array of win combos

        let winCount = 0; //used for counting each time someone clicks it will add 1 to it, so each time someone clicks same character in a winning combo, it will add one to value

        for (let j = 0; j < oneCombo.length; j++) {//go through each cell and check the cells of each winning combo, check the text content and compare it to the player variable
            if (cells[oneCombo[j]].textContent === player) {
                winCount++;
            }

            //displays in console which player wins
            if (winCount === 3) {
                gameWon = true;
                winText.innerHTML = `${player} wins! <br> ${button}`;
                cells.forEach(function(cell){
                    cell.removeEventListener("click", cellClicked);
                });

            }
        }
    }
}


function gameDraw() {
    winText.innerHTML = `It's a tie! <br> ${button}`;
    cells/forEach(function(cell){
        cell.removeEventListener("click", cellClicked)
    });
}


