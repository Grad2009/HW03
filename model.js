"use strict";

/*function runOnClick(){
	checkAndCreate(formFinalField());
}*/






function checkAndCreate(array) {
	var removeTable = document.getElementById("table");
	if (removeTable) {
		removeTable.parentNode.removeChild(removeTable);
	}
	restart();
	createTable(array);
	bombCounter();
}

function createTable(matrix) {
	var myTable = document.createElement("table");
	myTable.id = "table";
	for (var i = 0; i < FIELD_HEIGHT; i++) {
		var newRow = myTable.insertRow(i);
		for (var j = 0; j < FIELD_WIDTH; j++) {
			var newCell = newRow.insertCell(j);
			newCell.dataset.i = String(i);
        	newCell.dataset.j = String(j);
        	newCell.id = "cell-" + i + "-" + j;
        	}
	}
	document.body.appendChild(myTable);
	handleEvent(myTable, matrix);
}

function createTemplate() {
	var array = new Array(FIELD_HEIGHT);
	for(var i = 0; i < FIELD_HEIGHT; i++) {
		array[i] = new Array(FIELD_WIDTH);
		for(var j = 0; j < array[i].length; j++) {
			array[i][j] = 0;
		}
	}
		    
	return array;
}

function placeBomb(matrix) { 
    var leftBomb = BOMBS;
    var x, y;
    while (leftBomb) {
        x = randomInteger(FIELD_HEIGHT - 1);
        y = randomInteger(FIELD_WIDTH - 1);
        if (matrix[x][y] !== 9) {
            matrix[x][y] = 9;
            leftBomb = leftBomb - 1;
        } 
    } 
    
    return matrix;
}

function randomInteger(n) {
    var rand = Math.floor(Math.random() * (n + 1));
    
    return rand;
}

function formFinalField() {
    var matrix = placeBomb(createTemplate());
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++) {
            if (matrix[i][j] !== 9) {
                matrix[i][j] = determineNumberCell(i, j, matrix);
            }
        }
    }

    return matrix;
}

function determineNumberCell(x, y, array) {
    var a, b, c, d;
    var bombAround = 0;
    if (x === 0) {
        a = x;
    } else {
        a = x - 1;
    }
    
    if (x === FIELD_HEIGHT - 1) {
        b = x;
    } else {
        b = x + 1;
    }
    
    if (y === 0) {
        c = y;
    } else {
        c = y - 1;
    }
    
    if (y === FIELD_WIDTH - 1) {
        d = y;
    } else {
        d = y + 1;
    }
    for (var n = a; n < b + 1; n++) {
        for (var m = c; m < d + 1; m++) {
            if (array[n][m] === 9) {
                bombAround = bombAround + 1;
            }
        }
    }
    
    return bombAround;
}

