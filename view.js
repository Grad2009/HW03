"use strict";

function openEmptySpace(a, b, array) {
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