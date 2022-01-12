// function to validate the menu's input

export function checkGrid() {
    var gridVal = document.getElementById("gridSize").value;
    if(gridVal > 43){
        document.getElementById("gridSize").value = 43;
        return;
    }
    if(gridVal < 11){
        document.getElementById("gridSize").value = 11; 
        return;
    }
    if(gridVal % 2 == 0){
        document.getElementById("gridSize").value = gridVal - 1;  
        return;
    }
}