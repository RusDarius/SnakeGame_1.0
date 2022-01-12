export var obstacles = [];

// the generation of the obstacle course based on the grid and dificulty chosen

export function update(gridSize) {
    var newObstacle;
    var gameLevels = document.getElementById("gameLevels").value;
    obstacles.length = 0;

    switch (gameLevels) {
        // easy coarses
        case "0":
            break;
        case "1":
            for (let j = 1; j <= gridSize / 5; j++) {
                newObstacle = {
                    x: j,
                    y: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }

            var diff = gridSize - gridSize / 5 + 1;

            for (let j = gridSize; j > diff; j--) {
                newObstacle = {
                    x: j,
                    y: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }
            break;
        case "2":
            for (let j = 1; j <= gridSize / 5; j++) {
                newObstacle = {
                    y: j,
                    x: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }

            var diff = gridSize - gridSize / 5 + 1;

            for (let j = gridSize; j > diff; j--) {
                newObstacle = {
                    y: j,
                    x: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }
            break;
            // medium diff
        case "3":
            for (let j = 1; j <= gridSize / 5; j++) {
                newObstacle = {
                    x: j,
                    y: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }

            var diff = gridSize - gridSize / 5 + 1;

            for (let j = gridSize; j > diff; j--) {
                newObstacle = {
                    x: j,
                    y: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }
            for (let j = 1; j <= gridSize / 5; j++) {
                newObstacle = {
                    y: j,
                    x: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }

            for (let j = gridSize; j > diff; j--) {
                newObstacle = {
                    y: j,
                    x: Math.floor(gridSize / 2) + 1
                };
                obstacles.push(newObstacle);
            }
            break;
        case "4": // hard dificulty
            if(gridSize >= 21){
                for (let j = 2; j < gridSize / 3; j++) {
                    newObstacle = {
                        y: j,
                        x: Math.floor(gridSize / 3) 
                    };
                    obstacles.push(newObstacle);
                }
                for (let j = 2; j <= gridSize / 3; j++) {
                    newObstacle = {
                        x: j,
                        y: Math.floor(gridSize / 3) 
                    };
                    obstacles.push(newObstacle);
                }

                var diff = gridSize - Math.floor(gridSize / 3);

                for (let j = gridSize - 1; j > diff; j--) {
                    newObstacle = {
                        y: j,
                        x: Math.floor(gridSize / 3) 
                    };
                    obstacles.push(newObstacle);
                }
                for (let j = 2; j <= gridSize / 3; j++) {
                    newObstacle = {
                        y: j,
                        x: 2 * Math.floor(gridSize / 3) + 1
                    };
                    obstacles.push(newObstacle);
                }

                for (let j = gridSize - 1; j > diff; j--) {
                    newObstacle = {
                        x: j,
                        y: Math.floor(gridSize / 3) 
                    };
                    obstacles.push(newObstacle);
                }
                for (let j = 2; j <= gridSize / 3; j++) {
                    newObstacle = {
                        x: j,
                        y: 2 * Math.floor(gridSize / 3) + 1
                    };
                    obstacles.push(newObstacle);
                }

                for (let j = diff + 1; j <= gridSize - 1; j++) {
                    newObstacle = {
                        y: Math.floor(diff + 1),
                        x: j
                    };
                    obstacles.push(newObstacle);
                }
                for (let j = diff + 1; j <= gridSize - 1; j++) {
                    newObstacle = {
                        x: Math.floor(diff + 1),
                        y: j
                    };
                    obstacles.push(newObstacle);
                }

            }
            break;
    }
}

export function draw(board) {
    obstacles.forEach(segment => {
        const obsEl = document.createElement("div");
        obsEl.style.gridRowStart = segment.y;
        obsEl.style.gridColumnStart = segment.x;
        obsEl.classList.add("obstacle");
        board.appendChild(obsEl);
    });
}