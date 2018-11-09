var playerOne;
var playerTwo;
var turn;

var dotArr;
var boxArr;
var lineArr;

var dotSize;
var boxSize;

var boardSize;

var choiceA;
var choiceB;

function setup() {
	createCanvas(500, 500);

	playerOne = new player(color(50, 50, 200), 0);
	playerTwo = new player(color(200, 50, 50), 0);
	turn = true;

	dotSize = 10;
	boxSize = 50;
	boardSize = 4;

	dotArr = [];
	lineArr = [];
	boxArr = [];

	initalizeDotArr();
	initalizeLineArr();
	
	
  // TESTING 
	//dotArr[0][0].setColor(color(255,255,0));
	//dotArr[1][0].setColor(color(255,255,0));
	//dotArr[0][1].setColor(color(255,255,0));
	//dotArr[1][1].setColor(color(255,255,0));
	
	//dotArr[0][0].isActive = true;
	//dotArr[1][0].isActive = true;
	//dotArr[0][1].isActive = true;
	//dotArr[1][1].isActive = true;
	
	// END TESTING 
	
	initalizeBoxArr();
	
	console.log(lineArr);

	choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
}

function initalizeDotArr() {
	var dotX;
	var dotY;
	for (var i = 0; i < boardSize; i++) {
		dotArr[i] = [];
		for (var j = 0; j < boardSize; j++) {
			dotX = i * boxSize + boxSize;
			dotY = j * boxSize + boxSize;
			dotArr[i][j] = new dotObj(dotX, dotY, color(0, 0, 0, 0), 0);
		}
	}
}

function initalizeLineArr() {
	var inRow = true;
	for (var i = 0; i < (boardSize*2); i++) {
		if(i % 2 == 0) { inRow = true; }
		else { inRow = false; }
		lineArr[i] = [];
		for (var j = 0; j < boardSize; j++) {
			
			if(inRow) {
				//var centerX = i * (boxSize/2) + boxSize;
				var centerX = i * boxSize/2 + boxSize + (boxSize/2);
				var centerY = j * boxSize + boxSize;
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0, boxSize,dotSize);

			}
			else {
				var centerX = i * boxSize/2 + boxSize/2;
				var centerY = j * boxSize + boxSize + (boxSize/2);
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0,dotSize,boxSize);
			}
		}
	}
}

function initalizeBoxArr() {
	for (var i = 0; i < boardSize-1; i++) {
		boxArr[i] = [];
		for (var j = 0; j < boardSize-1; j++) {
			var centerX = i * boxSize + boxSize + (boxSize/2);
			var centerY = j * boxSize + boxSize + (boxSize/2);
			
			var nexti = i+1;
			var nextj = j+1;
			//boxArr[i][j] = new boxObj(centerX,centerY,color(100,100,100),lineArr[i][j],lineArr[nexti][nextj],lineArr[i][nextj],lineArr[nexti][j]);
			//boxArr[i][j].setColor(color(100,100,100));
		}
	}
}

function displayDots() {
	push();
	for (var i = 0; i < dotArr.length; i++) {
		for (var j = 0; j < dotArr.length; j++) {
			stroke(255);
			fill(dotArr[i][j].dotColor);
			ellipse(dotArr[i][j].x, dotArr[i][j].y, dotSize);
		}
	}
	pop();
}

function displayLines() {
	push();
	rectMode(CENTER);
	for (var i = 0; i < (boardSize*2); i++) {
		for (var j = 0; j < boardSize; j++) {
			stroke(51);
			fill(lineArr[i][j].lineColor);
			rect(lineArr[i][j].centerX,lineArr[i][j].centerY,lineArr[i][j].width,lineArr[i][j].height);
		}
	}
	pop();
}

function displayBoxes() {
	push();
	rectMode(CENTER);
	for (var i = 0; i < boxArr.length; i++) {
		for (var j = 0; j < boxArr.length; j++) {
			// if all 4 dots are active, draw the box
			if(boxArr[i][j].topLine.isActive && boxArr[i][j].rightLine.isActive && boxArr[i][j].leftLine.isActive && boxArr[i][j].bottomLine.isActive) {
				stroke(255);
				fill(boxArr[i][j].boxColor);
				rect(boxArr[i][j].centerX,boxArr[i][j].centerY,boxSize,boxSize);
			}
		}
	}
	pop();
}

function draw() {
	background(51);
	//displayBoxes();
	displayLines();
	displayDots();


	if (choiceA.isActive && !choiceB.isActive) {
		// draw a line from current choice to mouse cursor
		push();
		stroke(getTurnColor());
		strokeWeight(5);
		line(choiceA.x, choiceA.y, mouseX, mouseY);
		pop();
	}
	if (choiceA.isActive && choiceB.isActive) {
		//console.log("CHOICE MADE!");


		// if no box has been made, change turns
		turn = !turn;
		
		
		choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
		choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	}


	

	// show mouse over effect
	for (var i = 0; i < dotArr.length; i++) {
		for (var j = 0; j < dotArr.length; j++) {
			if (dist(mouseX, mouseY, dotArr[i][j].x, dotArr[i][j].y) <= dotSize / 2) {
				//if(!dotArr[i][j].isActive)
				fill(0, 255, 0);
				ellipse(dotArr[i][j].x, dotArr[i][j].y, dotSize);
			}
		}
	}
}

function getTurnColor() {
	var currColor;
	if (turn) {
		currColor = playerOne.playerColor;
	} else {
		currColor = playerTwo.playerColor;
	}
	return currColor;
}

function mousePressed() {
	for (var i = 0; i < dotArr.length; i++) {
		for (var j = 0; j < dotArr.length; j++) {
			if (dist(mouseX, mouseY, dotArr[i][j].x, dotArr[i][j].y) <= dotSize / 2) {
				//if dot clicked was choiceA, unselect choiceA
					if (dotArr[i][j].x == choiceA.x && dotArr[i][j].y == choiceA.y) {
						dotArr[i][j].dotColor = color(0, 0, 0, 0);
						choiceA.isActive = false;
					} else {
						if (!choiceA.isActive) {
								// if dot is not currently part of a box?
								dotArr[i][j].dotColor = getTurnColor();
								choiceA = dotArr[i][j];
								choiceA.isActive = true;

						} else { // set choiceB
							// if dot is not currently part of a box?
							dotArr[i][j].dotColor = getTurnColor();
							choiceB = dotArr[i][j];
							choiceB.isActive = true;
						}
					}
			}
		}
	}


}