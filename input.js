// fuction to manage the snakes movements 

let inputDir = {
    x: 0,
    y: 0
};
let lastInputDir = {
    x: 0,
    y: 0
};

import {
    enableLoop
} from "./gameMusic.js"

var once = 0;

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (once == 0) {
                enableLoop();
                once = 1;
            }
            if (lastInputDir.y !== 0) break;
            inputDir = {
                x: 0,
                y: -1
            };
            break;
        case "ArrowDown":
            if (once == 0) {
                enableLoop();
                once = 1;
            }
            if (lastInputDir.y !== 0) break;
            inputDir = {
                x: 0,
                y: 1
            };
            break;
        case "ArrowLeft":
            if (once == 0) {
                enableLoop();
                once = 1;
            }
            if (lastInputDir.x !== 0) break;
            inputDir = {
                x: -1,
                y: 0
            };
            break;
        case "ArrowRight":
            if (once == 0) {
                enableLoop();
                once = 1;
            }
            if (lastInputDir.x !== 0) break;
            inputDir = {
                x: 1,
                y: 0
            };
            break;
    }
});

export function getInputDir() {
    lastInputDir = inputDir;
    return inputDir;
}