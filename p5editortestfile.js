var playerOne;
var playerTwo;
var turn;
var computerPlayer;
var lastComputerMove;
var computerDifficulty;
var computerDifficultySlider;

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
	computerPlayer = false;
	computerDifficulty = 2;
	lastComputerMove = new lineObj(0, 0, color(0, 0, 0, 0), 0, boxSize, dotSize);

	gameOver = false;
	totalFilledBoxes = 0;
	dotSize = 15;
	boxSize = 50;
	
	//boardSize = 9;

	boardSizeSlider = createSlider(4, 9, 9);
	boardSizeSlider.position(200, 30);

	//checkbox to confirm computer player or not
	//fill(255);
	checkbox = createCheckbox(false);
	checkbox.position(270, 65);
	checkbox.changed(playVsComputer);

	dotArr = [];
	lineArr = [];
	boxArr = [];

	choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);

	p1c1Slider = createSlider(0, 255, 50);
	p1c1Slider.position(10, height - 100);
	p1c2Slider = createSlider(0, 255, 50);
	p1c2Slider.position(10, height - 70);
	p1c3Slider = createSlider(0, 255, 200);
	p1c3Slider.position(10, height - 40);
	p2c1Slider = createSlider(0, 255, 200);
	p2c1Slider.position(width - 215, height - 100);
	p2c2Slider = createSlider(0, 255, 50);
	p2c2Slider.position(width - 215, height - 70);
	p2c3Slider = createSlider(0, 255, 50);
	p2c3Slider.position(width - 215, height - 40);

	button = createButton('Confirm Player Colors');
	button.position(width / 2 - 100, 450);
	button.mousePressed(startGame);
}

function playVsComputer() {
	computerPlayer = !computerPlayer
	
	if(this.checked()) {
		computerDifficultySlider = createSlider(1, 2, 2);
		computerDifficultySlider.position(200, 95);
	}
	else {
			computerDifficultySlider.remove();
		}
}

function startGame() {
	setPlayerColors = false;
	button.remove();
	checkbox.remove();
	p1c1Slider.remove();
	p1c2Slider.remove();
	p1c3Slider.remove();
	p2c1Slider.remove();
	p2c2Slider.remove();
	p2c3Slider.remove();
	resizeCanvas(500, 500);

	boardSize = boardSizeSlider.value();
	boardSizeSlider.remove();
	
	if(computerPlayer) {
	computerDifficulty = computerDifficultySlider.value();
	computerDifficultySlider.remove();
	}
	dotArr = [];
	lineArr = [];
	boxArr = [];

	initalizeDotArr();
	initalizeLineArr();
	initalizeBoxArr();

	//console.log(lineArr);

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
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0, boxSize, dotSize / 2);

			} else {
				var centerX = i * boxSize / 2 + boxSize / 2;
				var centerY = j * boxSize + boxSize + (boxSize / 2);
				lineArr[i][j] = new lineObj(centerX, centerY, color(0, 0, 0, 0), 0, dotSize / 2, boxSize);
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
			boxArr[i][j] = new boxObj(centerX, centerY, color(100, 100, 100), lineArr[topLineX][j], lineArr[rightLineX][j], lineArr[leftLineX][j], lineArr[bottomLineX][nextj]);
			boxArr[i][j].setColor(color(100, 100, 100));
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
	if (setPlayerColors) {
		push();
		fill(playerOne.playerColor);
		rect(50, 150, 200, 225);

		fill(playerTwo.playerColor);
		rect(250, 150, 200, 225);

		textSize(24);
		fill(255);
		strokeWeight(2);
		stroke(0);
		text("Board Size: ", 50, 50);
		var bs = boardSizeSlider.value() - 1;
		text(bs + " x " + bs, 350, 50);
		text("Play Vs Computer? ", 50, 80);
		if(computerPlayer) {
			textSize(20);
			text("Difficulty Level: ", 50, 110);
		}
		textSize(24);
		text("Player 1", 100, 250);
		if (computerPlayer) {
			text("Computer", 300, 250);
		} else {
			text("Player 2", 300, 250);
		}
		text("Set Player Colors", 150, 400);
		pop();
		//player colors based on slider value
		playerOne.playerColor = color(p1c1Slider.value(), p1c2Slider.value(), p1c3Slider.value());
		playerTwo.playerColor = color(p2c1Slider.value(), p2c2Slider.value(), p2c3Slider.value());
		//playerTwo.playerColor = color(p1c3Slider.value(),p1c1Slider.value(),p1c2Slider.value());

	} else {
		// Display scores at top
		stroke(255);
		fill(255);
		textSize(24);
		text("Player 1 Score: " + playerOne.playerScore, 10, 25);
		if (computerPlayer) {
			text("Computer Score: " + playerTwo.playerScore, width - 215, 25);
		} else {
			text("Player 2 Score: " + playerTwo.playerScore, width - 215, 25);
		}

		displayBoxes();
		displayLines();
		displayDots();

		// computer will control player 2
		if (computerPlayer && !turn) {
			makeComputerChoice();
			//console.log("COMPUTER CHOICE MADE!");
			choiceA.isActive = true;
			choiceB.isActive = true;
			//console.log(choiceA);
			//console.log(choiceB);
			//makeComputerChoice();
			//if (choiceA.isActive && !choiceB.isActive) {
			//	makeComputerChoice();
			//}
		}

		if (choiceA.isActive && !choiceB.isActive) {
			// draw a line from current choice to mouse cursor
			push();
			stroke(getTurnColor());
			strokeWeight(5);
			line(choiceA.x, choiceA.y, mouseX, mouseY);
			pop();
		}
		if (choiceA.isActive && choiceB.isActive) {
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

			// activate the line that cooresponds to the two selected points
			for (var i = 0; i < (boardSize * 2); i++) {
				for (var j = 0; j < boardSize; j++) {
					if (lineArr[i][j].centerX == lineX && lineArr[i][j].centerY == lineY) {
						lineArr[i][j].isActive = true;
						lineArr[i][j].setColor(getTurnColor());

						if (computerPlayer && !turn) {
							lastComputerMove.setColor(getTurnColor());
							lastComputerMove = lineArr[i][j];
							lastComputerMove.setColor(color(255, 255, 0));
						}
					}
				}
			}

			var numBoxesMade = checkGameBoard();

			// if no box has been made, change turns
			if (numBoxesMade > 0) {
				//console.log(numBoxesMade);
				if (turn) {
					playerOne.playerScore += numBoxesMade;
				} else {
					playerTwo.playerScore += numBoxesMade
				}
				totalFilledBoxes += numBoxesMade;

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
					//fill(getTurnColor());
					fill(255);
					ellipse(dotArr[i][j].x, dotArr[i][j].y, dotSize);
				}
			}
		}

		if (totalFilledBoxes == ((boardSize - 1) * (boardSize - 1))) {
			// All boxes have been filled
			background(51);
			stroke(0, 0, 0);
			fill(255);
			textSize(72);
			text("Game Over!", 50, height / 2);
			textSize(36);
			text("Player 1 Score: " + playerOne.playerScore, width / 2 - 100, height / 2 + 50);
			if (computerPlayer) {
				text("Computer Score: " + playerTwo.playerScore, width / 2 - 100, height / 2 + 100);
			} else {
				text("Player 2 Score: " + playerTwo.playerScore, width / 2 - 100, height / 2 + 100);
			}
			noLoop();
		} else {

			// display current player's turn
			push();
			var currPlayer = (turn ? 1 : 2)
			stroke(255);
			//strokeWeight(3);
			fill(getTurnColor());
			textSize(24);
			if (computerPlayer && !turn) {
				text("Computer's Turn", width / 2 - 75, height - 10);
			} else {
				text("Player " + currPlayer + "'s Turn", width / 2 - 75, height - 10);
			}
			pop();
		}
	}
	// draw last computer move different color
	push();
	//fill(255,255,0);
	//lastComputerMove.setColor(color(255,255,0));
	rect(lastComputerMove.x, lastComputerMove.y, lastComputerMove.w, lastComputerMove.h);
	pop();
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
			if (!boxArr[i][j].isLocked) {
				if (lineArr[topLineX][j].isActive && lineArr[rightLineX][j].isActive && lineArr[leftLineX][j].isActive && lineArr[bottomLineX][nextj].isActive) {
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
						// Check to see if the new choice is one dot away from Choice A
						if (dist(choiceA.x, choiceA.y, dotArr[i][j].x, dotArr[i][j].y) <= boxSize) {
							choiceB = dotArr[i][j];
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
							// make sure dot is not currently part of a box
							for (var r = 0; r < (boardSize * 2); r++) {
								for (var c = 0; c < boardSize; c++) {
									if (lineArr[r][c].centerX == lineX && lineArr[r][c].centerY == lineY && lineArr[r][c].isActive) {
										lineExists = true;
									}
								}
							}
							if (!lineExists) {
								dotArr[i][j].dotColor = getTurnColor();
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

function makeComputerChoice() {
	var choiceMade = false;
	choiceA = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	choiceB = new dotObj(0, 0, color(0, 0, 0, 0), 0);
	// computer Difficulty 2
	// prioritize any line that makes a box, edges, then random

	// computer Difficulty 3
	// prioritize any line that make a box
	// do not choose a line that makes 3 edges unless no other option

	// computer Difficulty 4
	// same as difficulty 3 but when choosing the option to make 3 edges,
	// calculate how many boxes that will score the other player and choose
	// the option that gives the least boxes

	if (computerDifficulty == 2) {

		// look for any chance to make a box
		for (var i = 0; i < boardSize - 1; i++) {
			for (var j = 0; j < boardSize - 1; j++) {
				//console.log("SERACHING. . .");
				if (!boxArr[i][j].isLocked) {
					var numEdges = 0;
					var inActiveLine = null;
					if (boxArr[i][j].topLine.isActive) {
						numEdges += 1;
					} else {
						inActiveLine = boxArr[i][j].topLine;
					}
					if (boxArr[i][j].rightLine.isActive) {
						numEdges += 1;
					} else {
						inActiveLine = boxArr[i][j].rightLine;
					}
					if (boxArr[i][j].leftLine.isActive) {
						numEdges += 1;
					} else {
						inActiveLine = boxArr[i][j].leftLine;
					}
					if (boxArr[i][j].bottomLine.isActive) {
						numEdges += 1;
					} else {
						inActiveLine = boxArr[i][j].bottomLine;
					}

					if (numEdges == 3) {
						if (inActiveLine.width > inActiveLine.height) { // line is horizontal
							choiceA.x = inActiveLine.centerX - boxSize / 2;
							choiceA.y = inActiveLine.centerY;

							choiceB.x = inActiveLine.centerX + boxSize / 2;
							choiceB.y = inActiveLine.centerY;
						} else { // line is vertical
							choiceA.x = inActiveLine.centerX;
							choiceA.y = inActiveLine.centerY - boxSize / 2;

							choiceB.x = inActiveLine.centerX;
							choiceB.y = inActiveLine.centerY + boxSize / 2;
						}
						choiceA.isActive = true;
						choiceB.isActive = true;
						choiceA.dotColor = getTurnColor();
						choiceB.dotColor = getTurnColor();
						choiceMade = true;
					}
				}
			}
		}
		// if no boxes, try to play an edge
		if (!choiceMade) {
			//console.log("TRYING ANY LINE DIFFICULTY 2...");
			for (var i = 0; i < (boardSize * 2); i++) {
				for (var j = 0; j < boardSize; j++) {
					//console.log("STILL SERACHING. . .");
					if (!lineArr[i][j].isActive && (lineArr[i][j].centerX <= (boxSize * boardSize)) && (lineArr[i][j].centerY <= (boxSize * boardSize))) {
						//pick line if it is along an edge x is left or right edge
						// or y is top or bottom edge
						if (((lineArr[i][j].centerX == boxSize) || (lineArr[i][j].centerX == (boxSize * boardSize))) || ((lineArr[i][j].centerY == boxSize) || lineArr[i][j].centerY == ((boxSize * boardSize)))) {
							//console.log("LINE FOUND: ");
							//console.log(lineArr[i][j]);
							// prioritize edges over other options
							if (lineArr[i][j].width > lineArr[i][j].height) { // line is horizontal
								choiceA.x = lineArr[i][j].centerX - boxSize / 2;
								choiceA.y = lineArr[i][j].centerY;

								choiceB.x = lineArr[i][j].centerX + boxSize / 2;
								choiceB.y = lineArr[i][j].centerY;
							} else { // line is vertical
								choiceA.x = lineArr[i][j].centerX;
								choiceA.y = lineArr[i][j].centerY - boxSize / 2;

								choiceB.x = lineArr[i][j].centerX;
								choiceB.y = lineArr[i][j].centerY + boxSize / 2;
							}
							choiceA.isActive = true;
							choiceB.isActive = true;
							choiceA.dotColor = getTurnColor();
							choiceB.dotColor = getTurnColor();
							choiceMade = true;
						}
					}
				}
			}
		}
		// if no boxes, pick any valid option
		if (!choiceMade) {
			//console.log("TRYING ANY LINE DIFFICULTY 2...");
			for (var i = 0; i < (boardSize * 2); i++) {
				for (var j = 0; j < boardSize; j++) {
					//console.log("STILL SERACHING. . .");
					if (!lineArr[i][j].isActive && (lineArr[i][j].centerX <= (boxSize * boardSize)) && (lineArr[i][j].centerY <= (boxSize * boardSize))) {
							if (lineArr[i][j].width > lineArr[i][j].height) { // line is horizontal
								choiceA.x = lineArr[i][j].centerX - boxSize / 2;
								choiceA.y = lineArr[i][j].centerY;

								choiceB.x = lineArr[i][j].centerX + boxSize / 2;
								choiceB.y = lineArr[i][j].centerY;
							} else { // line is vertical
								choiceA.x = lineArr[i][j].centerX;
								choiceA.y = lineArr[i][j].centerY - boxSize / 2;

								choiceB.x = lineArr[i][j].centerX;
								choiceB.y = lineArr[i][j].centerY + boxSize / 2;
							}
							choiceA.isActive = true;
							choiceB.isActive = true;
							choiceA.dotColor = getTurnColor();
							choiceB.dotColor = getTurnColor();
							choiceMade = true;
					}
				}
			}
		}
	} // difficulty 2

	if (computerDifficulty == 1 || choiceMade != true) {
		for (var i = 0; i < (boardSize * 2); i++) {
				for (var j = 0; j < boardSize; j++) {
					//console.log("STILL SERACHING. . .");
					if (!lineArr[i][j].isActive && (lineArr[i][j].centerX <= (boxSize * boardSize)) && (lineArr[i][j].centerY <= (boxSize * boardSize))) {
							if (lineArr[i][j].width > lineArr[i][j].height) { // line is horizontal
								choiceA.x = lineArr[i][j].centerX - boxSize / 2;
								choiceA.y = lineArr[i][j].centerY;

								choiceB.x = lineArr[i][j].centerX + boxSize / 2;
								choiceB.y = lineArr[i][j].centerY;
							} else { // line is vertical
								choiceA.x = lineArr[i][j].centerX;
								choiceA.y = lineArr[i][j].centerY - boxSize / 2;

								choiceB.x = lineArr[i][j].centerX;
								choiceB.y = lineArr[i][j].centerY + boxSize / 2;
							}
							choiceA.isActive = true;
							choiceB.isActive = true;
							choiceA.dotColor = getTurnColor();
							choiceB.dotColor = getTurnColor();
							choiceMade = true;
					}
				}
			}
	} // computer difficulty 1



}



///////////////////////////////////////////////////////////////////////////////

class player {
	constructor(_c,_s) {
		this.playerColor = _c;
		this.playerScore = _s;	
	}

	getScore() {
		return this.playerScore;
	}
}

class lineObj {
	constructor(_x,_y,_c,_t,_w,_h) {
		this.centerX = _x;
		this.centerY = _y;
		this.lineColor = _c;
		this.isActive = _t;	
		this.width = _w;
		this.height = _h;
	}

	setColor(_c) {
		this.lineColor = _c;
	}
}

class dotObj {
	constructor(_x,_y,_c,_t) {
		this.x = _x;
		this.y = _y;
		this.dotColor = _c;
		this.isActive = _t;	
	}

	setColor(_c) {
		this.dotColor = _c;
	}
}

class boxObj {
	constructor(_x, _y, _c, _l1, _l2, _l3, _l4) {
		this.centerX = _x;
		this.centerY = _y;
		this.topLine = _l1;
		this.rightLine = _l2;
		this.leftLine = _l3;
		this.bottomLine = _l4;
		this.boxColor = _c;
		this.isLocked = false;
	}

	setColor(_c) {
		this.boxColor = _c;
	}
}