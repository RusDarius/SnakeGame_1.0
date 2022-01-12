let lastTime = 0;

import {
    update as updateSnake,
    draw as drawSnake,
    snakeSPEED,
    addGameSettings,
    gridSize
} from "./snake.js";

import {
    draw as drawFood
} from "./food.js";

import {
    update as updateCourse,
    draw as drawCourse,
} from "./obstacles.js"

var board = document.getElementById("gameBoard"); // the board with the snake and food
var boardObstacles = document.getElementById("gameBoardObstacles"); // background for the obstacles
var menuOnOff = 0; // menu on / off checker

function addInputEvent() { // function to manage the menu settings

    document.getElementById("menuVals").addEventListener("click", addGameSettings);
    window.addEventListener("keydown", function (e) { // function to manage menu visibility
        if (e.keyCode == 77) {
            document.getElementById("menu").style.visibility = "visible";
            menuOnOff++;
            if (menuOnOff % 2 == 0)
                document.getElementById("menu").style.visibility = "hidden";
        }
    })

}

// the main function provides a simple gameLoop to update and redraw the state of the game

function main(currentTime) {

    window.requestAnimationFrame(main); // a call to create the loop
    const secondsSinceRender = (currentTime - lastTime) / 1000; // in seconds
    if (secondsSinceRender < 1 / snakeSPEED) return; 
    // we update the game based on the speed we want for the snake
    updateBoard();
    drawUpdate();

    lastTime = currentTime; // timestamp changes for the next secondsSinceRender 
                            // for updateBoard() and drawUpdate()

}

addInputEvent();
updateCourse(gridSize);
drawCourse(boardObstacles);
window.requestAnimationFrame(main); // one call to start the loop

function updateBoard() {
    // we update the snake and inside the rest of the game
    updateSnake();
}

function drawUpdate() {
    board.innerHTML = ""; // clear the board for repaint
    drawSnake(board); // repaint snake
    drawFood(board); // repaint food
}