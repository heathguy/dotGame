var playerOne;
var playerTwo;
var turn;
var gameOver;

var dotArr;
var boxArr;
var lineArr;

var dotSize;
var boxSize;

var boardSize;
var totalFilledBoxes;

var choiceA;
var choiceB;

var setPlayerColors;

function setup() {
	createCanvas(500, 600);

	playerOne = new player(color(50, 50, 200), 0);
	playerTwo = new player(color(200, 50, 50), 0);
	setPlayerColors = true;
	turn = true;
	gameOver = false;


	dotSize = 10;
	boxSize = 50;
	boardSize = 9;
	totalFilledBoxes = 0;

	dotArr = [];
	lineArr = [];
	boxArr = [];

	initalizeDotArr();
	initalizeLineArr();
	initalizeBoxArr();

	choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	
	p1c1Slider = createSlider(0, 255, 50);
  p1c1Slider.position(10, height-100);
	p1c2Slider = createSlider(0, 255, 50);
  p1c2Slider.position(10, height-70);
	p1c3Slider = createSlider(0, 255, 200);
  p1c3Slider.position(10, height-40);
  p2c1Slider = createSlider(0, 255, 200);
  p2c1Slider.position(width-215, height-100);
	p2c2Slider = createSlider(0, 255, 50);
  p2c2Slider.position(width-215, height-70);
	p2c3Slider = createSlider(0, 255, 50);
  p2c3Slider.position(width-215, height-40);
	
	button = createButton('Confirm Player Colors');
  button.position(width/2 - 100, 450);
  button.mousePressed(startGame);
}

function startGame() {
	setPlayerColors = false;
	button.remove();
	p1c1Slider.remove();
	p1c2Slider.remove();
	p1c3Slider.remove();
  p2c1Slider.remove();
	p2c2Slider.remove();
	p2c3Slider.remove();
	resizeCanvas(500,500);
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
	for (var i = 0; i < (boardSize * 2); i++) {
		if (i % 2 == 0) {
			inRow = true;
		} else {
			inRow = false;
		}
		lineArr[i] = [];
		for (var j = 0; j < boardSize; j++) {

			if (inRow) {
				//var centerX = i * (boxSize/2) + boxSize;
				var centerX = i * boxSize / 2 + boxSize + (boxSize / 2);
				var centerY = j * boxSize + boxSize;
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0, boxSize, dotSize);

			} else {
				var centerX = i * boxSize / 2 + boxSize / 2;
				var centerY = j * boxSize + boxSize + (boxSize / 2);
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0, dotSize, boxSize);
			}
		}
	}
}

function initalizeBoxArr() {
	var lineNbr = 0;
	for (var i = 0; i < boardSize - 1; i++) {
		lineNbr = lineNbr * 2;
		boxArr[i] = [];
		for (var j = 0; j < boardSize - 1; j++) {
			var centerX = i * boxSize + boxSize + (boxSize / 2);
			var centerY = j * boxSize + boxSize + (boxSize / 2);

			var nexti = i + 1;
			var nextj = j + 1;
			
			var topLineX = i * 2;
			var rightLineX = i * 2 + 3;
			var leftLineX = i * 2 + 1;
			var bottomLineX = i * 2;
			boxArr[i][j] = new boxObj(centerX,centerY,color(100,100,100),lineArr[topLineX][j],lineArr[rightLineX][j],lineArr[leftLineX][j],lineArr[bottomLineX][nextj]);
			boxArr[i][j].setColor(color(100,100,100));
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
	for (var i = 0; i < (boardSize * 2); i++) {
		for (var j = 0; j < boardSize; j++) {
			stroke(51);
			fill(lineArr[i][j].lineColor);
			rect(lineArr[i][j].centerX, lineArr[i][j].centerY, lineArr[i][j].width, lineArr[i][j].height);
			//fill(255);
			//stroke(255);
			//text(i + ", " + j, lineArr[i][j].centerX-10, lineArr[i][j].centerY);
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
			if (boxArr[i][j].topLine.isActive && boxArr[i][j].rightLine.isActive && boxArr[i][j].leftLine.isActive && boxArr[i][j].bottomLine.isActive) {
				stroke(255);
				fill(boxArr[i][j].boxColor);
				rect(boxArr[i][j].centerX, boxArr[i][j].centerY, boxSize, boxSize);
			}
			//fill(255);
			//stroke(255,0,0);
			//text(i + ", " + j, boxArr[i][j].centerX-10, boxArr[i][j].centerY);
		}
	}
	pop();
}

function draw() {
	background(51);
	
	// SELECT PLAYER COLORS!
	if(setPlayerColors) {
		push();
		fill(playerOne.playerColor);
		rect(50,50,200,300);

		fill(playerTwo.playerColor);
		rect(250,50,200,300);
		
		textSize(24);
		fill(255);
		strokeWeight(2);
		stroke(0);
		text("Player 1",100,200);
		text("Player 2",300,200);
		text("Set Player Colors",150,375);
		pop();
	//player colors based on slider value
	playerOne.playerColor = color(p1c1Slider.value(),p1c2Slider.value(),p1c3Slider.value());
  playerTwo.playerColor = color(p2c1Slider.value(),p2c2Slider.value(),p2c3Slider.value());
		
	
	}
	else {
	// Display scores at top
	stroke(255);
	fill(255);
	textSize(24);
	text("Player 1 Score: " + playerOne.playerScore,10,25);
	text("Player 2 Score: " + playerTwo.playerScore,width-215,25);
	
	displayBoxes();
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
		//console.log(choiceA.x, choiceA.y, ",", choiceB.x, choiceB.y);
		var lineX;
		var lineY;
		if (choiceA.x == choiceB.x) {
			lineX = choiceA.x;
		} else {
			if (choiceA.x > choiceB.x) {
				lineX = choiceA.x - boxSize / 2;
			} else {
				lineX = choiceB.x - boxSize / 2;
			}
			//lineX = abs(choiceA.x - choiceB.x) + boxSize/2;
		}
		if (choiceA.y == choiceB.y) {
			lineY = choiceA.y;
		} else {
			if (choiceA.y > choiceB.y) {
				lineY = choiceA.y - boxSize / 2;
			} else {
				lineY = choiceB.y - boxSize / 2;
			}
			//lineY = abs(choiceA.y - choiceB.y) + boxSize/2;
		}
		
		// activate the line that cooresponds to the two selected points
		for (var i = 0; i < (boardSize * 2); i++) {
			for (var j = 0; j < boardSize; j++) {
				if (lineArr[i][j].centerX == lineX && lineArr[i][j].centerY == lineY) {
					//console.log("LINE FOUND!");
					lineArr[i][j].isActive = true;
					lineArr[i][j].setColor(getTurnColor());
				}
			}
		}
		
		//console.log("Line Midpoint:");
		//console.log(lineX,",",lineY);
		
		var numBoxesMade = checkGameBoard();
		
		// if no box has been made, change turns
		if(numBoxesMade > 0) {
			//console.log(numBoxesMade);
			if (turn) {
				playerOne.playerScore += numBoxesMade;
			} else {
				playerTwo.playerScore += numBoxesMade
			}
			totalFilledBoxes+= numBoxesMade;
			
			//console.log("Player 1 Score: " + playerOne.playerScore);
			//console.log("Player 2 Score: " + playerTwo.playerScore);
			
			
		} else {
			turn = !turn;
		}
		
		choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
		choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	}

	// show mouse over effect
	for (var i = 0; i < dotArr.length; i++) {
		for (var j = 0; j < dotArr.length; j++) {
			if (dist(mouseX, mouseY, dotArr[i][j].x, dotArr[i][j].y) <= dotSize / 2) {
				//if(!dotArr[i][j].isActive)
				fill(getTurnColor());
				ellipse(dotArr[i][j].x, dotArr[i][j].y, dotSize);
			}
		}
	}
	
	if(totalFilledBoxes == ( (boardSize-1) * (boardSize-1) )) {
			// All boxes have been filled
			background(51);
			stroke(255,0,0);
			textSize(72);
			text("Game Over!",50,height/2);
			textSize(36);
			text("Player 1 Score: " + playerOne.playerScore,width/2-100,height/2+50);
			text("Player 2 Score: " + playerTwo.playerScore,width/2-100,height/2+100);
			noLoop();
		}
		
		// display current player's turn
	var currPlayer = (turn ? 1 : 2)
	stroke(0);
	fill(getTurnColor());
	textSize(24);
	text("Player " + currPlayer + "'s Turn",width/2-100,height-10);

	}
	
}

function checkGameBoard() {
	var boxesMade = 0;
	
	var lineNbr = 0;
	for (var i = 0; i < boardSize - 1; i++) {
		lineNbr = lineNbr * 2;
		for (var j = 0; j < boardSize - 1; j++) {
			var centerX = i * boxSize + boxSize + (boxSize / 2);
			var centerY = j * boxSize + boxSize + (boxSize / 2);

			var nexti = i + 1;
			var nextj = j + 1;
			
			var topLineX = i * 2;
			var rightLineX = i * 2 + 3;
			var leftLineX = i * 2 + 1;
			var bottomLineX = i * 2;
			if(!boxArr[i][j].isLocked) {
				if(lineArr[topLineX][j].isActive && lineArr[rightLineX][j].isActive && lineArr[leftLineX][j].isActive && lineArr[bottomLineX][nextj].isActive) {
					boxArr[i][j].setColor(getTurnColor());
					boxArr[i][j].isLocked = true;
					boxesMade += 1;
				}
			}
		}
	}
	return boxesMade;
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
					choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
				} else {
					if (!choiceA.isActive) {
						// if dot is not currently part of a box?
						dotArr[i][j].dotColor = getTurnColor();
						choiceA = dotArr[i][j];
						choiceA.isActive = true;

					} else { // set choiceB
						if (dist(choiceA.x, choiceA.y, dotArr[i][j].x, dotArr[i][j].y) <= boxSize) {
							choiceB = dotArr[i][j];
							// if dot is not currently part of a box?
							var lineX;
							var lineY;
							if (choiceA.x == choiceB.x) {
								lineX = choiceA.x;
							} else {
								if (choiceA.x > choiceB.x) {
									lineX = choiceA.x - boxSize / 2;
								} else {
									lineX = choiceB.x - boxSize / 2;
								}
							}
							if (choiceA.y == choiceB.y) {
								lineY = choiceA.y;
							} else {
								if (choiceA.y > choiceB.y) {
									lineY = choiceA.y - boxSize / 2;
								} else {
									lineY = choiceB.y - boxSize / 2;
								}
							}
							var lineExists = false;
							for (var r = 0; r < (boardSize * 2); r++) {
								for (var c = 0; c < boardSize; c++) {
									if (lineArr[r][c].centerX == lineX && lineArr[r][c].centerY == lineY && lineArr[r][c].isActive) {
										//console.log("LINE EXISTS!");
										lineExists = true;
									}
								}
							}
							if (!lineExists) {
								dotArr[i][j].dotColor = getTurnColor();
								//choiceB = dotArr[i][j];
								choiceB.isActive = true;
							} else {
								choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
							}
						}
					}
				}
			}
		}
	}
}