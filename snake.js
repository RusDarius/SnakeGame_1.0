// the snake game logic

import {
    getInputDir
} from "./input.js";

import {
    update as updateFood,
    food,
    food2,
    food3
} from "./food.js";

import {
    checkGrid
} from "./settingsRules.js";

import {
    obstacles,
    update as updateCourse,
    draw as drawCourse
} from "./obstacles.js"

import {
    gameOver,
    ateFood,
    ateSuperFood
} from "./gameMusic.js"

const boardObstacles = document.getElementById("gameBoardObstacles");
const board = document.getElementById("gameBoard");
var started = 0;
export var snakeSPEED = 7.5; // 7.5 times per sec 
export var snakeSize = 1;
var snakeColor = 0;
export var gridSize = 21;
var lastTime = 0;
export var isInv = 0;

var snakeBody = [{
    x: Math.floor(gridSize / 2) + 1,
    y: Math.floor(gridSize / 2) + 1
}]; // the body of the snake is an array of Objects with the x and y fields (coords) for the gridLayout

document.getElementById("score").innerHTML = snakeSize;

export function addGameSettings() { // functie de actualizare a conditiilor de joc

    checkGrid(); // we check the menu input values
    gridSize = document.getElementById("gridSize").value;
    board.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
    board.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    boardObstacles.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
    boardObstacles.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    snakeSPEED = document.getElementById("snakeSpeed").value;
    boardObstacles.innerHTML = "";
    updateCourse(gridSize);
    drawCourse(boardObstacles);
    updateSnakeStart();
    updateFood();

}

function updateSnakeStart() { // function to kickstart the snake
    while (snakeBody.length > 0) {
        snakeBody.pop();
    }
    snakeBody.push({
        x: Math.floor(gridSize / 2) + 1,
        y: Math.floor(gridSize / 2) + 1
    });
    snakeSize = 1;
}

function start() {
    food.push({
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    });
    food2.push({
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    });
    food3.push({
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    });
    updateFood();
    started = 1;
}

export function update() {

    if (started == 0)
        start();
    const inDir = getInputDir();
    var head = snakeBody[snakeBody.length - 1];

    if (onSnake(head)) {
        gameOver();
    }

    if (snakeColor != 2) {
        if (onObstacle(head)) {
            gameOver();
        }
    }
    
    if (+head.x + +inDir.x > gridSize) {
        snakeBody.push({
            x: 1,
            y: head.y
        });
        snakeBody.shift();
    } else
    if (+head.y + +inDir.y > gridSize) {
        snakeBody.push({
            x: head.x,
            y: 1
        });
        snakeBody.shift();
    } else
    if (+head.x + +inDir.x < 1) {
        snakeBody.push({
            x: Number(gridSize),
            y: head.y
        });
        snakeBody.shift();
    } else
    if (+head.y + +inDir.y < 1) {
        snakeBody.push({
            x: head.x,
            y: Number(gridSize)
        });
        snakeBody.shift();
    } else
        snakeBody.push({
            x: head.x + inDir.x,
            y: head.y + inDir.y
        });

    if (onFood(food[0])) {
        ateFood();
        if (snakeColor == 2 && isInv == 0) {
            lastTime = new Date();
            isInv = 1;
        }
        if (isInv == 1) {
            snakeSize += 3;
            if (((+new Date()) - lastTime) / 1000 < 6) {
                snakeSPEED = 12;
                updateFood();
            } else {
                snakeColor = 0;
                snakeSPEED = 10;
                isInv = 0;
                updateFood();
            }
        } else {
            snakeColor = 0;
            snakeSPEED = 10;
            snakeSize += 3;
            updateFood();
        }
        document.getElementById("score").innerHTML = snakeSize;
    }

    if (onFood(food2[0])) {
        ateFood();
        if (snakeColor == 2 && isInv == 0) {
            lastTime = new Date();
            isInv = 1;
        }
        if (isInv == 1) {
            snakeSize += 1;
            if (((+new Date()) - lastTime) / 1000 < 6) {
                snakeSPEED = 12;
                updateFood();
            } else {
                snakeColor = 1;
                snakeSPEED = 5;
                isInv = 0;
                updateFood();
            }
        } else {
            snakeColor = 1;
            snakeSPEED = 5;
            snakeSize += 1;
            updateFood();
        }
        document.getElementById("score").innerHTML = snakeSize;
    }

    if (onFood(food3[0])) {
        ateSuperFood();
        snakeSize += 0;
        snakeSPEED = 12;
        snakeColor = 2;
        food3.shift();
        updateFood();
        document.getElementById("score").innerHTML = snakeSize;
    }

    if (snakeBody.length > snakeSize) { // we shift the body of the snake based on its lenght
        snakeBody.shift();
    }

}

export function draw(board) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        switch (snakeColor) {
            case 0:
                snakeElement.classList.add("snake");
                break;
            case 1:
                snakeElement.classList.add("snakeSlow");
                break;
            case 2:
                snakeElement.classList.add("snakeInvincible");
                break;
        }
        board.appendChild(snakeElement);
    });
}

function onSnake(pos) { // checks if the head of the snake is rendered on an existing bodypart
    for (let i = 0; i < snakeBody.length - 1; i++) {
        if (equalPos(snakeBody[i], pos)){
            return true;
        }
    }
}

export function onFood(pos) { // checks if the snake intersected food
    if (pos === undefined) return;
    return snakeBody.some(segment => {
        return equalPos(segment, pos);
    });
}

export function onObstacle(pos) {
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x == pos.x && obstacles[i].y == pos.y){
            return true;
        }
    }
    return false;
}

function equalPos(pos1, pos2) { // checks if 2 positions are the same
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function randomGridPos() { // generates random positions for the new food
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}