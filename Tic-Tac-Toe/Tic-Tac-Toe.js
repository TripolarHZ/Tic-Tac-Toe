const cells = document.querySelectorAll(".cell");
const title = document.querySelector("#title");
const statusText = document.querySelector("#status")
const restartButton = document.querySelector("#restartButton");
const startButton1 = document.querySelector("#startButton1");
const startButton2 = document.querySelector("#startButton2");
const onePlayer = document.querySelector("#single");
const twoPlayer = document.querySelector("#double");

let player1 = "";
let player2 = "";
let running = false; 
let gameMode = 0;
let winner = null;
const gameState = {
    players: ['x', 'o'],
    board: [
        null, null, null,
        null, null, null,
        null, null, null
    ]
  }
let currentPlayer = gameState.players[0];

startButton1.addEventListener("click",start1);
startButton2.addEventListener("click",start2);
onePlayer.addEventListener("click",singlePlayer);
twoPlayer.addEventListener("click",doublePlayers);

function start1(){
    document.getElementById('starting').play();
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("onePlayer").style.visibility = "hidden";
    determinePlayerOne();
    statusText.style.color = "blue";
    cells.forEach(cell => cell.addEventListener("click", selection));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${player1}'s turn`; 
    running = true;
    if(botTurn()){
        setTimeout(() => {
            let choice = bestMove();
            let cellPick = ""+choice;
            selectedCell(cellPick, document.getElementById(cellPick));
        }, 1000);
    }
}

function start2(){
    document.getElementById('starting').play();
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("twoPlayers").style.visibility = "hidden";
    determinePlayerTwo();
    statusText.style.color = "blue";
    cells.forEach(cell => cell.addEventListener("click", selected));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${player1}'s turn`; 
    running = true;
}

function determinePlayerOne(){
    let random = Math.floor(Math.random() * 2);
    if(random == 1){
        player1 = document.getElementById("player11name").value;
        document.getElementById("gamePlayer1").innerText = player1;
        player2 = "SMART_BOT";
        document.getElementById("gamePlayer2").innerText = player2;
    }else{
        player2 = document.getElementById("player11name").value;
        document.getElementById("gamePlayer2").innerText = player2;
        player1 = "SMART_BOT";
        document.getElementById("gamePlayer1").innerText = player1;
    }
}

function determinePlayerTwo(){
    let random = Math.floor(Math.random() * 2);
    if(random == 1){
        player1 = document.getElementById("player12name").value;
        document.getElementById("gamePlayer1").innerText = player1;
        player2 = document.getElementById("player2name").value;
        document.getElementById("gamePlayer2").innerText = player2;
    }else{
        player2 = document.getElementById("player12name").value;
        document.getElementById("gamePlayer2").innerText = player2;
        player1 = document.getElementById("player2name").value;
        document.getElementById("gamePlayer1").innerText = player1;
    }
}

function singlePlayer(){
    document.getElementById('choosing').play();
    document.getElementById("mode").style.visibility = "hidden";
    document.getElementById("onePlayer").style.visibility = "visible";
    gameMode = 1;
}

function doublePlayers(){
    document.getElementById('choosing').play();
    document.getElementById("mode").style.visibility = "hidden";
    document.getElementById("twoPlayers").style.visibility = "visible";
    gameMode = 2;
}

function botTurn(){
    if(currentPlayer == gameState.players[0] &&
        player1 == "SMART_BOT"){
            return true;
        }else if(currentPlayer == gameState.players[1] &&
            player2 == "SMART_BOT"){
                return true;
            }
    return false;
}

function bestMove(){
    let ai = "";
    let human = "";
    if(currentPlayer == gameState.players[0] &&
        player1 == "SMART_BOT"){
            ai = 'x';
            human = 'o';
        }else if(currentPlayer == gameState.players[1] &&
            player2 == "SMART_BOT"){
                ai = 'o';
                human = 'x';
            }

    let bestSpot = 0;
    if(winCol(ai) == winDiagonal(ai) && winCol(ai) == winRow(ai)) bestSpot = winCol(ai);
    else if(winRow(ai) != 0) bestSpot = winRow(ai);
    else if(winCol(ai) != 0) bestSpot = winCol(ai);
    else if(winDiagonal(ai) != 0) bestSpot = winDiagonal(ai);
    if(bestSpot != 0) {
        return bestSpot;
    }
    if(blockCol(human) == blockRow(human) && blockCol(human) == blockDiagonal(human)) bestSpot = blockCol(human);
    else if(blockRow(human) != 0) bestSpot = blockRow(human);
    else if(blockCol(human) != 0) bestSpot = blockCol(human);
    else if(blockDiagonal(human) != 0) bestSpot = blockDiagonal(human);
    if(bestSpot == 0){
        for(let i = 0; i < gameState.board.length; i++){
            if(gameState.board[i] == null){
                bestSpot = i;
                break;
            }
        }
    }
    return bestSpot;
}

function blockRow(human){
    let index = 0;
    let row = 0;
    while(row < 7){
        if(gameState.board[row] == gameState.board[row+1] &&
            gameState.board[row]==human&&
            gameState.board[row+2] == null){
                index = row+2;
                return index;
            }else if(gameState.board[row] == gameState.board[row+2] &&
                gameState.board[row]==human&&
                gameState.board[row+1] == null){
                    index = row+1;
                    return index;
                }else if(gameState.board[row+1] == gameState.board[row+2] &&
                    gameState.board[row+1]==human&&
                    gameState.board[row] == null){
                        index = row;
                        return index;
                    }
        row+=3;
    }
    return index;
}

function winRow(AI){
    let index = 0;
    let row = 0;
    while(row < 7){
        if(gameState.board[row] == gameState.board[row+1] &&
            gameState.board[row]==AI&&
            gameState.board[row+2] == null){
                index = row+2;
                return index;
            }else if(gameState.board[row] == gameState.board[row+2] &&
                gameState.board[row]==AI&&
                gameState.board[row+1] == null){
                    index = row+1;
                    return index;
                }else if(gameState.board[row+1] == gameState.board[row+2] &&
                    gameState.board[row+1]==AI&&
                    gameState.board[row] == null){
                        index = row;
                        return index;
                    }
        row+=3;
    }
    return index;
}

function blockCol(human){
    let index = 0;
    let col = 0;
    while(col < 3){
        if(gameState.board[col] == gameState.board[col+3] &&
            gameState.board[col]==human&&
            gameState.board[col+6] == null){
                index = col+6;
                return index;
            }else if(gameState.board[col] == gameState.board[col+6] &&
                gameState.board[col]==human&&
                gameState.board[col+3] == null){
                    index = col+3;
                    return index;
                }else if(gameState.board[col+3] == gameState.board[col+6] &&
                    gameState.board[col+3]==human&&
                    gameState.board[col] == null){
                        index = col;
                        return index;
                    }
        col++;
    }
    return index;
}

function winCol(AI){
    let index = 0;
    let col = 0;
    while(col < 3){
        if(gameState.board[col] == gameState.board[col+3] &&
            gameState.board[col]==AI&&
            gameState.board[col+6] == null){
                index = col+6;
                return index;
            }else if(gameState.board[col] == gameState.board[col+6] &&
                gameState.board[col]==AI&&
                gameState.board[col+3] == null){
                    index = col+3;
                    return index;
                }else if(gameState.board[col+3] == gameState.board[col+6] &&
                    gameState.board[col+3]==AI&&
                    gameState.board[col] == null){
                        index = col;
                        return index;
                    }
        col++;
    }
    return index;
}

function blockDiagonal(human){
    let index = 0;
    if(gameState.board[0] == gameState.board[4] &&
        gameState.board[0] == human &&
        gameState.board[8] == null){
            index = 8;
            return index;
        }else if(gameState.board[0] == gameState.board[8] &&
            gameState.board[0] == human &&
            gameState.board[4] == null){
                index = 4;
                return index;
            }else if(gameState.board[4] == gameState.board[8] &&
                gameState.board[4] == human &&
                gameState.board[0] == null){
                    index = 0;
                    return index;
                }else if(gameState.board[2] == gameState.board[4] &&
                    gameState.board[2] == human &&
                    gameState.board[6] == null){
                        index = 6;
                        return index;
                    }else if(gameState.board[2] == gameState.board[6] &&
                        gameState.board[2] == human &&
                        gameState.board[4] == null){
                            index = 4;
                            return index;
                        }else if(gameState.board[4] == gameState.board[6] &&
                            gameState.board[4] == human &&
                            gameState.board[2] == null){
                                index = 2;
                                return index;
                            }
    return index;
}

function winDiagonal(AI){
    let index = 0;
    if(gameState.board[0] == gameState.board[4] &&
        gameState.board[0] == AI &&
        gameState.board[8] == null){
            index = 8;
            return index;
        }else if(gameState.board[0] == gameState.board[8] &&
            gameState.board[0] == AI &&
            gameState.board[4] == null){
                index = 4;
                return index;
            }else if(gameState.board[4] == gameState.board[8] &&
                gameState.board[4] == AI &&
                gameState.board[0] == null){
                    index = 0;
                    return index;
                }else if(gameState.board[2] == gameState.board[4] &&
                    gameState.board[2] == AI &&
                    gameState.board[6] == null){
                        index = 6;
                        return index;
                    }else if(gameState.board[2] == gameState.board[6] &&
                        gameState.board[2] == AI &&
                        gameState.board[4] == null){
                            index = 4;
                            return index;
                        }else if(gameState.board[4] == gameState.board[6] &&
                            gameState.board[4] == AI &&
                            gameState.board[2] == null){
                                index = 2;
                                return index;
                            }
    return index;
}

function selection(){
    if(botTurn()) return;
    selectedCell(this.id,this);
    if(checkWin() || tie()) return;
    if(botTurn()){
        setTimeout(() => {
            let choice = bestMove();
            let cellPick = ""+choice;
            selectedCell(cellPick, document.getElementById(cellPick));
        }, 1000);
    }
}

function selected(){
    const cellID = this.id;
    if(gameState.board[cellID] != null || !running){
        return;
    }
    updateCell(this,cellID);
    switchPlayer();
    checkWin();
    tie();
}

function selectedCell(cellID,cellChoice){
    if(gameState.board[cellID] != null || !running){
        return;
    }
    updateCell(cellChoice,cellID);
    switchPlayer();
    checkWin();
    tie();
}

function updateCell(cell, index){
    gameState.board[index] = currentPlayer;
    cell.textContent = (currentPlayer == gameState.players[0]) ? "X" : "O";
    cell.style.backgroundColor = (currentPlayer == gameState.players[0]) ? "blue" : "coral";
    cell.style.color = 'white';
    cell.style.borderColor = "black";
    if(currentPlayer == gameState.players[0]){
        document.getElementById('click1').play();
    }else{
        document.getElementById('click2').play();
    }
}

function switchPlayer(){
    currentPlayer = (currentPlayer == gameState.players[0]) ? gameState.players[1] : gameState.players[0];
    statusText.textContent = (currentPlayer == gameState.players[1]) ? `${player2}'s turn` : `${player1}'s turn`;
    statusText.style.color = (currentPlayer == gameState.players[1]) ? "coral" : "blue";
}

function drawWin(){
    const winMessage = document.getElementById("win");
    winMessage.innerText = (winner == 'X') ? `${player1} Win!` : `${player2} Win!`;
    document.getElementById("cheering").play();
}

function checkWin(){
    if(checkRow() ||
        checkColumn() ||
        checkDiagonal()){
            drawWin();
            running = false; 
            return true;
        }
    return false;
}

function checkRow(){
    let row = 0;
    while(row <= 6){
        if(gameState.board[row]==gameState.board[row+1]&&
            gameState.board[row]==gameState.board[row+2]&&
            gameState.board[row]!=null&&
            gameState.board[row+1]!=null&&
            gameState.board[row+2]!=null){
                winner = (currentPlayer == gameState.players[1]) ? 'X' : 'O';
                return true;
            }
        row+=3;
    }
    return false;
}

function checkColumn(){
    let col = 0;
    while(col < 3){
        if(gameState.board[col]==gameState.board[col+3]&&
            gameState.board[col]==gameState.board[col+6]&&
            gameState.board[col]!=null&&
            gameState.board[col+3]!=null&&
            gameState.board[col+6]!=null) {
                winner = (currentPlayer == gameState.players[1]) ? 'X' : 'O';
                return true;
            }
        col++;
    }
    return false;
}

function checkDiagonal(){
    if(gameState.board[0] == gameState.board[4]&&
        gameState.board[0] == gameState.board[8]&&
        gameState.board[0] != null &&
        gameState.board[4] != null &&
        gameState.board[8] != null){
            winner = (currentPlayer == gameState.players[1]) ? 'X' : 'O';
            return true;
        }

    else if(gameState.board[2] == gameState.board[4]&&
        gameState.board[2] == gameState.board[6]&&
        gameState.board[2] != null &&
        gameState.board[4] != null &&
        gameState.board[6] != null){
            winner = (currentPlayer == gameState.players[1]) ? 'X' : 'O';
            return true;
        }

    return false;
}

function restartGame(){
    document.getElementById('restarting').play();
    currentPlayer = gameState.players[0];
    gameState.board.fill(null);
    statusText.textContent = `${player1}'s turn`; 
    cells.forEach(cell => cell.textContent = "");
    running = true;
    const winMessage = document.getElementById("win");
    winMessage.innerText = "";
    document.getElementById("tie").style.visibility = "hidden";
    document.getElementById("mode").style.visibility = "visible";
    document.getElementById("game").style.visibility = "hidden";
    document.getElementById("player11name").value = '';
    document.getElementById("player12name").value = '';
    document.getElementById("player2name").value = '';
    cells.forEach(cell => cell.style.backgroundColor = 'white');
}

function tie(){
    let filled = true;
    for(let i = 0; i < gameState.board.length; i++){
        if(gameState.board[i] == null) filled = false;
    }
    if(!checkWin() && filled == true){
        document.getElementById("tie").style.visibility = "visible";
        document.getElementById('tieing').play();
        winner = 'tie';
        running = false;
    }
}



