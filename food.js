// food management

let lastTime = new Date();
export var food3Exists = false;
var once = 0;

import {
    isInv,
    onFood,
    onObstacle,
    randomGridPos
} from "./snake.js";

export var food = []; // +1 go slower
export var food2 = []; // bigger food +3 go faster
export var food3 = []; // invincible to walls 

export function update() {

    const secondsSinceRender = (+new Date() - lastTime) / 1000; // in seconds
    food.push(getRandFood());
    food.shift();
    food2.push(getRandFood2());
    food2.shift();
    if (secondsSinceRender > 25) {
        if (isInv == 0 && food3Exists == true) {
            food3.push(getRandFood3());
            console.log(food3.length);
        }
        if (isInv == 0 && food3Exists == false && once == 0) {
            food3.push(getRandFood3());
            console.log(food3.length);
            once = 1;
        }
        lastTime = new Date();
        food3Exists = true;
    }else{
        food3.length = 0;
    }
}

export function draw(board) {
    food.forEach(segment => {
        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = segment.y;
        foodElement.style.gridColumnStart = segment.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
    });
    food2.forEach(segment => {
        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = segment.y;
        foodElement.style.gridColumnStart = segment.x;
        foodElement.classList.add("food2");
        board.appendChild(foodElement);
    });
    if (food3Exists == true) {
        if(food3.length > 1)
            food3.shift();
        food3.forEach(segment => {
            const foodElement = document.createElement("div");
            foodElement.style.gridRowStart = segment.y;
            foodElement.style.gridColumnStart = segment.x;
            foodElement.classList.add("food3");
            board.appendChild(foodElement);
        });
    }
}

// the while conditions also check the foods position so that no overlaps happen
// with the snake / walls / other types of food

function getRandFood() {
    let newFoodPos;
    while (newFoodPos == null || onFood(newFoodPos) == true || onObstacle(newFoodPos) == true) {
        newFoodPos = randomGridPos();
    }
    return newFoodPos;
}

function getRandFood2() {
    let newFoodPos;
    while (newFoodPos == null || onFood(newFoodPos) == true ||
        (food[0].x == newFoodPos.x && food[0].y == newFoodPos.y) || onObstacle(newFoodPos) == true) {
        newFoodPos = randomGridPos();
    }
    return newFoodPos;
}

function getRandFood3() {
    let newFoodPos;
    while (newFoodPos == null || onFood(newFoodPos) == true ||
        (food[0].x == newFoodPos.x && food[0].y == newFoodPos.y) || onObstacle(newFoodPos) == true ||
        (food2[0].x == newFoodPos.x && food2[0].y == newFoodPos.y)) {
        newFoodPos = randomGridPos();
    }
    return newFoodPos;
}