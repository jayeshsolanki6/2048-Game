window.onload = () => {
    setUp();
}
const currentSocre = document.querySelector(".current-score");
const bestScore = document.querySelector(".best-score");
const box = document.querySelector(".box");
const newGame = document.querySelector(".new-game");
const gameOver = document.querySelector(".game-over");
const tryAgain = document.querySelector(".try-again");

let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
let score = 0;
let best = localStorage.getItem("bestScore") || 0;

newGame.addEventListener("click", () => {
    reset();
})
tryAgain.addEventListener("click", () => {
    reset();
    gameOver.style.display = "none";
})
const setUp = () => {
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `${i}-${j}`;
            box.appendChild(tile);
        }
    }
    bestScore.innerText = best;
    setRandom();
    setRandom();
}
const reset = () => {
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            board[i][j] = 0;
            updateTile(i, j, 0);
        }
    }
    score = 0;
    currentSocre.innerText = 0;
    best = localStorage.getItem("bestScore") || 0;
    bestScore.innerText = best;
    setRandom();
    setRandom();
}

const isGameOver = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == board[i][j + 1]) {
                return false;
            }
        }
    }

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            if (board[i][j] == board[i + 1][j]) {
                return false;
            }
        }
    }
    return true;
}

const setRandom = () => {
    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);
    if(board[row][column] == 0){
        board[row][column] = 2;
        updateTile(row, column, 2);
    } else{

        setRandom();
    }
}

const updateTile = (i, j, num) => {
    const tile = document.getElementById(`${i}-${j}`);
    tile.innerText = "";
    tile.classList.value = "tile";
    if(num > 0){
        tile.classList.add(`x${num}`);
        tile.innerText = num; 
    }
}

const updateScore = () => {
    currentSocre.innerText = score;
    if(score > best){
        best = score;
        localStorage.setItem("bestScore", best);
        bestScore.innerText = best;
    }
}

document.addEventListener("keyup", (e) => {
    let oldBoard = JSON.stringify(board);
    console.log(oldBoard);
    if(e.code == "ArrowLeft"){
        slideLeft();
    } else if(e.code == "ArrowRight"){
        slideRight();
    } else if(e.code == "ArrowUp"){
        slideUp();
    } else if(e.code == "ArrowDown"){
        slideDown();
    }
    let newBoard = JSON.stringify(board);
    if(oldBoard !== newBoard){
        setRandom();
    } 
    if(isGameOver()){
        gameOver.style.display = "flex";
    }
});

const slide = (arr) => {
    arr = arr.filter(num => num != 0);
    for(let i = 0; i<arr.length - 1; i++){
        if(arr[i] == arr[i+1]){
            arr[i]*=2;
            arr[i+1] = 0;
            score += arr[i];
            updateScore();
        }
    }
    arr = arr.filter(num => num != 0);
    while(arr.length < 4){
        arr.push(0);
    }
    return arr;
}

const slideLeft = () => {
    for(let i = 0; i<4; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;
        
        for(let j = 0; j<4; j++){
            updateTile(i, j, board[i][j]);
        }
    }
}
const slideRight = () => {
    for(let i = 0; i<4; i++){
        let row = board[i].reverse();
        row = slide(row);
        board[i] = row.reverse();
        
        for(let j = 0; j<4; j++){
            updateTile(i, j, board[i][j]);
        }
    }
}
const slideUp = () => {
    for(let i = 0; i<4; i++){
        let row = [];
        row.push(board[0][i], board[1][i], board[2][i], board[3][i]);
        row = slide(row);
        for(let j = 0; j<4; j++){
            board[j][i] = row[j];
            updateTile(j, i, board[j][i]);
        }
    }
}
const slideDown = () => {
    for(let i = 0; i<4; i++){
        let row = [];
        row.push(board[0][i], board[1][i], board[2][i], board[3][i]);
        row = row.reverse();
        row = slide(row).reverse();
        for(let j = 0; j<4; j++){
            board[j][i] = row[j];
            updateTile(j, i, board[j][i]);
        }
    }
}
