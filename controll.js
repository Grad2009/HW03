"use strict";

// Будет переделываться в ООП, блок констант изменится на вариант выбора уровня
var FIELD_HEIGHT = 9;
var FIELD_WIDTH = 9;
var BOMBS = 10;
var numberOpenCells = FIELD_HEIGHT * FIELD_WIDTH;
var currentNumberBombs = BOMBS;

// Event handlers block

window.onload=function(){
    var startbutton = document.getElementById("start");
	startbutton.addEventListener("click", function () {
	checkAndCreate(formFinalField());});
}

function handleEvent(newTable, array) {
	newTable.addEventListener("click", function() {
		reactOnEvent(event, newTable, array);
	}, false);
	newTable.addEventListener("contextmenu", function() {
		reactOnEvent(event, newTable, array);
	}, false);
}

function reactOnEvent(event, table, matrix) {
	event.preventDefault();
	if ((event.target) && (endGame() !== "end")) {
		
		if (event.type === 'click') {
			defineOpenCells(event.target, matrix);
			checkBomb(event.target, matrix);
		}
			
		if (event.type === 'contextmenu') {
			determineBomb(event.target);
		}
	}
}

// end of event handlers 

function defineOpenCells(openCell, matrix) {
    	var x = openCell.getAttribute("data-i");
	var y = openCell.getAttribute("data-j");
	if (openCell.className === "flag") {
		currentNumberBombs = currentNumberBombs + 1;
		bombCounter();
	} 
    	defineVictory(openCell);
	openCell.className = "open";
	if (matrix[+x][+y] === 0) {
		openEmptySpace(+x, +y, matrix);
	} else {
		openCell.innerHTML = String(matrix[+x][+y]);		
	}
}

function checkBomb (openCell, array) {
	if (Number(openCell.innerHTML) === 9) {
		var winMessage = document.getElementById("message");
		winMessage.innerHTML = "GAME OVER!";
		openCell.className = "boom";
		openCell.innerHTML = "";
	}
}

function defineVictory(сell) {
	var result;
	if ((numberOpenCells - BOMBS - 1) === 0) {
		var winMessage = document.getElementById("message");
		
		winMessage.innerHTML = "YOU WIN!";
		result = "endGame";
	} else if (сell.className !== "open") {
		numberOpenCells = numberOpenCells - 1;
		result = "nowin";
	}
	
	return result;
}

function endGame() {
	var winMessage = document.getElementById("message");
	if ((winMessage.innerHTML === "YOU LOSE!") || (winMessage.innerHTML === "YOU WIN!")) {
	// open all;	
		return "end";
	}
}

function determineBomb(openBomb) {
	if (openBomb.className === "flag") {
		currentNumberBombs = currentNumberBombs + 1;
		bombCounter();
		openBomb.className = "";
		openBomb.innerHTML = "";
	} else if ((currentNumberBombs > 0) && (openBomb.className !== "open")) {
		currentNumberBombs = currentNumberBombs - 1;
		bombCounter();
		openBomb.className = "flag";
	    openBomb.innerHTML = "";
	}
}

function bombCounter() {
	var bombMessage = document.getElementById("bombs");
	bombMessage.innerHTML = "Bomb counter: " + currentNumberBombs;
}

function restart() {
	currentNumberBombs = BOMBS;
	numberOpenCells = FIELD_HEIGHT * FIELD_WIDTH;
	var winMessage = document.getElementById("message");
	winMessage.innerHTML = "";
}

/*function openEmptySpace(a, b, array) {
	for (var stepX = -1; stepX < 2; stepX++) {
		for (var stepY = -1; stepY < 2; stepY ++) {
			var neighborX = a + stepX; 
			var neighborY = b + stepY;
			if (hasNeighbor(neighborX, neighborY)) {
				openNeighbor(neighborX, neighborY, array);
			}
		}
	}
}

function hasNeighbor (x, y) {
	if ((x === -1) || (x === FIELD_HEIGHT) || (y === -1) || (y === FIELD_WIDTH)) {
		
		return false;
	} else {

		return true;
	}
}

function openNeighbor (x, y, matrix) {
	var cell = document.getElementById("cell-" + x + "-" + y);
	if (cell.className !== "open") {
		defineVictory(cell);
		cell.className = "open";
		if (matrix[x][y] > 0) {
			cell.innerHTML = matrix[x][y];
		}
		
		if (matrix[x][y] === 0)  {
			setTimeout(openEmptySpace(x, y, matrix), 0);
		}
	}
}
*/