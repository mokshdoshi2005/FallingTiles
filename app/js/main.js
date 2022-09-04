import Grid from "./gameboard.js";
import { GRID_SIZE } from "./gameboard.js";
import { Random } from "./gameboard.js";
import { Falling_blocks } from "./game-logic.js";
import { playing } from "./game-logic.js";
import { LocatePlayer } from "./game-logic.js";
import { reappearingBlock2 } from "./game-logic.js";

const Gameboard = document.getElementById('GameBoard');
console.log(Gameboard)
const grid = new Grid(Gameboard)

const GAMEPADUP = document.querySelector('#GAMEPAD-UP');
const GAMEPADRIGHT = document.querySelector('#GAMEPAD-RIGHT');
const GAMEPADLEFT = document.querySelector('#GAMEPAD-LEFT');
const GAMEPADDOWN = document.querySelector('#GAMEPAD-DOWN');


let fallen__block = document.querySelectorAll('.cell');
let Fallen_Ary = []
let FallingTiles = []
let score_board = document.querySelector('.score-board');
let GeneratableBlock = false

// //Moblie only 
if (screen.width <= 800) {
    GAMEPADUP.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[1] > 0 ){
            moveup(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADLEFT.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[0] > 0){
            moveleft(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADRIGHT.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[0] < (GRID_SIZE - 1)){
            moveright(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADDOWN.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[1] < (GRID_SIZE - 1)){
            movedown(player)
            ALLGAMERUN()
        }
    });
}


// // USER INPUT
document.addEventListener("keypress", e => {
    // left = 37
    // up = 38      keycode
    // right = 39
    // down = 40
    if (e.key == 'w' || e.key == "ArrowUp") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[1] > 0 ){
            moveup(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 's' || e.key == "ArrowDown") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[1] < (GRID_SIZE - 1)){
            movedown(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 'a' || e.key == "ArrowLeft") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[0] > 0){
            moveleft(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 'd' || e.key == "ArrowRight") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        if (Ary[0] < (GRID_SIZE - 1)){
            moveright(player)
            ALLGAMERUN()
        }
    };
});

function moveup(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_y = parseInt(y) - 1
    player.style.setProperty("--y",new_y);
    player.dataset.y = new_y       
}
function moveleft(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_x = parseInt(x) - 1 
    player.style.setProperty("--x",new_x);
    player.dataset.x = new_x
}
function movedown(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_y = parseInt(y) + 1
    player.style.setProperty("--y",new_y);
    player.dataset.y = new_y       
}
function moveright(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_x = parseInt(x) + 1 
    player.style.setProperty("--x",new_x);
    player.dataset.x = new_x
}

function updateClass(player, newPlayer){
    player.classList.remove('.player')
    newPlayer.classList.add(".player")
}

function updateScore() {
    if(playing === true) {
        score_board.dataset.score = parseInt(score_board.dataset.score) + 1;
        score_board.innerHTML = score_board.dataset.score
    }
};

function validMove([x,y],signX,signY) {
    moveX = [x,y][0] + (1*signX)
    moveY = [x,y][1] + (1*signY)
    for (let loop = 0;loop < Fallen_Ary.length();loop++) {
        console.log(loop)
        if (moveX === Fallen_Ary[loop][0] && movey === Fallen_Ary[loop][1]) {
            return
        }
    }
}

function ALLGAMERUN() {
    updateScore()
    GeneratableBlock = reappearingBlock2()
    console.log(GeneratableBlock)
    if (GeneratableBlock !== true) {
        Falling_blocks(Fallen_Ary,fallen__block,FallingTiles)
    }
}
