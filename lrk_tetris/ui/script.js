'use strict';
var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 640;

var sound1 = new Audio('audio/theme.mp3');
var sound2 = new Audio('audio/moveS.mp3');
var sound3 = new Audio('audio/succe.mp3');
var sound4 = new Audio('audio/gameover.mp3');
var sound5 = new Audio('audio/win.mp3');

sound1.volume = 0.3;
sound2.volume = 0.3;
sound3.volume = 0.8;
sound4.volume = 0.5;
sound5.volume = 0.8;

sound1.loop = true;
sound2.loop = false;
sound3.loop = false;
sound4.loop = false;
sound5.loop = false;

var element = document.getElementById('#mainSpot');
var g = canvas.getContext('2d');
var success = false;
var right = { x: 1, y: 0 };
var down = { x: 0, y: 1 };
var left = { x: -1, y: 0 };
var EMPTY = -1;
var BORDER = -2;


var fallingShape;
var nextShape;
var dim = 640;
var nRows = 18;
var nCols = 12;
var blockSize = 30;
var topMargin = 50;
var leftMargin = 20;
var scoreX = 400;
var scoreY = 330;
var titleX = 130;
var titleY = 160;
var clickX = 120;
var clickY = 400;
var previewCenterX = 467;
var previewCenterY = 97;
var mainFont = 'bold 48px monospace';
var smallFont = 'bold 18px monospace';
var colors = ['#4e6e5d', '#e26d5c', '#1f5673', '#602080', '#d5896f', '#ccdbdc', '#a7a2a9'];
var gridRect = { x: 46, y: 47, w: 308, h: 517 };
var previewRect = { x: 387, y: 47, w: 200, h: 200 };
var titleRect = { x: 100, y: 95, w: 252, h: 100 };
var clickRect = { x: 50, y: 375, w: 252, h: 40 };
var outerRect = { x: 5, y: 5, w: 630, h: 630 };
var squareBorder = '#b4cded';
var titlebgColor = '#7765e3';
var textColor = 'white';
var bgColor = '#0e273c';
var gridColor = '#181c1880';
var gridBorderColor = '#22333b';
var largeStroke = 5;
var smallStroke = 2;

// position of falling shape
var fallingShapeRow;
var fallingShapeCol;

var keyDown = false;
var fastDown = false;

var grid = [];
var scoreboard = new Scoreboard();

var fullTime = 30;
var warn     = 15;
var almost   = 7;
var end = 0;

var currTime = fullTime;

function playSound(sound, delay) {
    setTimeout(function() {
        sound.currentTime = 0;
      sound.play();
    }, delay);
  }
  function stopAllSounds() {
    sound1.pause();
    sound2.pause();
    sound3.pause();
  }

function showDiv() {
    var div = document.getElementById('myDiv');
    var opacity = 0;
    var startTime = null;
  
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      opacity = Math.min(progress / 350, 1); // Czas trwania 300ms
      div.style.opacity = opacity;
  
      if (opacity < 1) {
        requestAnimationFrame(animate);
      } else {
        div.classList.add('visible');
      }
    }
  
    requestAnimationFrame(animate);
  }
  
  function resetDiv() {
    var div = document.getElementById('myDiv');
    div.style.opacity = '0';
  }


async function resetTimer() {
    clearInterval(timer);
    $('.timer-bar').css({ 'width': '100%' });
    $('.timer-bar').removeClass('timer-warn');
    $('.timer-bar').removeClass('timer-almost');
  }



function fetchSuccess() {
	$.post(`http://${GetParentResourceName()}/udane`)
    scoreboard.setGameOver();
    g.clearRect(0, 0, canvas.width, canvas.height);
    drawNEWUI();
    resetTimer();
    stopAllSounds()
    resetDiv();
    playSound(sound5, 0);
    hackInfo.style.display = 'none';
}



function fetchFailed() {
	$.post(`http://${GetParentResourceName()}/nieudane`)
    scoreboard.setGameOver();
    g.clearRect(0, 0, canvas.width, canvas.height);
    drawNEWUI();
    stopAllSounds()
    resetDiv();
    resetTimer();
    hackInfo.style.display = 'none';
}




addEventListener('keydown', function (event) {
    if (!keyDown) {
        keyDown = true;

        if (scoreboard.isGameOver())
            return;

        switch (event.key) {

            case 'w':
            case 'ArrowUp':
                if (canRotate(fallingShape))
                    rotate(fallingShape);
                    playSound(sound2, 0);
                break;

            case 'a':
            case 'ArrowLeft':
                if (canMove(fallingShape, left))
                    move(left);
                    playSound(sound2, 0);
                break;

            case 'd':
            case 'ArrowRight':
                if (canMove(fallingShape, right))
                    move(right);
                    playSound(sound2, 0);
                break;

            case 's':
            case 'ArrowDown':
                if (canMove(fallingShape, down))
                move(down);
                playSound(sound2, 0);

            break;

            case ' ':
            case ' ':
                if (!fastDown) {
                    fastDown = true;
                    while (canMove(fallingShape, down)) {
                        move(down);
                        playSound(sound2, 0);
                    }
                }
        }
        draw();
    }
});

addEventListener('click', function () {
    startNewGame();
});

addEventListener('keyup', function () {
    keyDown = false;
    fastDown = false;
});

function canRotate(s) {
    if (s === Shapes.Square)
        return false;

    var pos = new Array(4);
    for (var i = 0; i < pos.length; i++) {
        pos[i] = s.pos[i].slice();
    }

    pos.forEach(function (row) {
        var tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
    });

    return pos.every(function (p) {
        var newCol = fallingShapeCol + p[0];
        var newRow = fallingShapeRow + p[1];
        return grid[newRow][newCol] === EMPTY;
    });
}

function rotate(s) {
    if (s === Shapes.Square)
        return;

    s.pos.forEach(function (row) {
        var tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
    });
}

function move(dir) {
    fallingShapeRow += dir.y;
    fallingShapeCol += dir.x;
}

function canMove(s, dir) {
    return s.pos.every(function (p) {
        var newCol = fallingShapeCol + dir.x + p[0];
        var newRow = fallingShapeRow + dir.y + p[1];
        return grid[newRow][newCol] === EMPTY;
    });
}

function shapeHasLanded() {
    addShape(fallingShape);
    playSound(sound3, 0);
    if (fallingShapeRow < 2) {
        scoreboard.setGameOver();
        scoreboard.setTopscore();
    } else {
        scoreboard.addLines(removeLines());
    }
    selectShape();
}

function removeLines() {
    var count = 0;
    for (var r = 0; r < nRows - 1; r++) {
        for (var c = 1; c < nCols - 1; c++) {
            if (grid[r][c] === EMPTY)
                break;
            if (c === nCols - 2) {
                count++;
                removeLine(r);
            }
        }
    }
    return count;
}

function removeLine(line) {
    for (var c = 0; c < nCols; c++)
        grid[line][c] = EMPTY;

    for (var c = 0; c < nCols; c++) {
        for (var r = line; r > 0; r--)
            grid[r][c] = grid[r - 1][c];
    }
}

function addShape(s) {
    s.pos.forEach(function (p) {
        grid[fallingShapeRow + p[1]][fallingShapeCol + p[0]] = s.ordinal;
    });
}

function Shape(shape, o) {
    this.shape = shape;
    this.pos = this.reset();
    this.ordinal = o;
}

var Shapes = {
    ZShape: [[0, -1], [0, 0], [-1, 0], [-1, 1]],
    SShape: [[0, -1], [0, 0], [1, 0], [1, 1]],
    IShape: [[0, -1], [0, 0], [0, 1], [0, 2]],
    TShape: [[-1, 0], [0, 0], [1, 0], [0, 1]],
    Square: [[0, 0], [1, 0], [0, 1], [1, 1]],
    LShape: [[-1, -1], [0, -1], [0, 0], [0, 1]],
    JShape: [[1, -1], [0, -1], [0, 0], [0, 1]]
};

function getRandomShape() {
    var keys = Object.keys(Shapes);
    var ord = Math.floor(Math.random() * keys.length);
    var shape = Shapes[keys[ord]];
    return new Shape(shape, ord);
}

Shape.prototype.reset = function () {
    this.pos = new Array(4);
    for (var i = 0; i < this.pos.length; i++) {
        this.pos[i] = this.shape[i].slice();
    }
    return this.pos;
}

function selectShape() {
    fallingShapeRow = 1;
    fallingShapeCol = 5;
    fallingShape = nextShape;
    nextShape = getRandomShape();
    if (fallingShape != null) {
        fallingShape.reset();
    }
}

function Scoreboard() {
    this.MAXLEVEL = 9;

    var level = 0;
    var lines = 0;
    var score = 0;
    var topscore = 0;
    var winscore = 5
    var gameOver = true;

    this.reset = function () {
        this.setTopscore();
        level = lines = score = 0;
        gameOver = false;
    }

    this.setGameOver = function () {
        gameOver = true;
    }

    this.isGameOver = function () {
        return gameOver;
    }

    this.setTopscore = function () {
        if (score > topscore) {
            topscore = score;
        }
    }

    this.getTopscore = function () {
        return topscore;
    }

    this.getSpeed = function () {

        switch (level) {
            case 0: return 700;
        }
    }

    this.addScore = function (sc) {
        score += sc;
    }
    this.undoScore = function (sc) {
        score -= sc;
    }

    this.addLines = function (line) {

        switch (line) {
            case 1:
                this.addScore(10);
                break;
            case 2:
                this.addScore(20);
                break;
            case 3:
                this.addScore(30);
                break;
            case 4:
                this.addScore(40);
                break;
            default:
                return;
        }

        lines += line;
        if (lines > 10) {
            this.addLevel();
        }
    }

    this.addLevel = function () {
        
    }

    this.getLevel = function () {
        return level;
    }

    this.getLines = function () {
        return lines;
    }

    this.getScore = function () {
        return score;
    }
}

function draw() {
    g.clearRect(0, 0, canvas.width, canvas.height);

    drawUI();

    if (scoreboard.isGameOver()) {
        drawStartScreen();
        fetchFailed();
    } else {
        drawFallingShape();
    }
}

function drawStartScreen() {
    g.font = mainFont;

    g.fillStyle = textColor;

    g.font = smallFont;
    g.fillText('click to start', clickX, clickY);
    
}

function fillRect(r, color) {
    g.fillStyle = color;
    g.fillRect(r.x, r.y, r.w, r.h);
}

function drawRect(r, color) {
    g.strokeStyle = color;
    g.strokeRect(r.x, r.y, r.w, r.h);
}

function drawSquare(colorIndex, r, c) {
    var bs = blockSize;
    g.fillStyle = colors[colorIndex];
    g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);

    g.lineWidth = smallStroke;
    g.strokeStyle = squareBorder;
    g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
}

function drawUI() {

    // background
    fillRect(outerRect, bgColor);
    fillRect(gridRect, gridColor);
    

    // the blocks dropped in the grid
    for (var r = 0; r < nRows; r++) {
        for (var c = 0; c < nCols; c++) {
            var idx = grid[r][c];
            if (idx > EMPTY)
                drawSquare(idx, r, c);
        }
    }

    // the borders of grid and preview panel
    g.lineWidth = largeStroke;
    drawRect(gridRect, gridBorderColor);
    drawRect(previewRect, gridBorderColor);
    drawRect(outerRect, gridBorderColor);

    // scoreboard
    g.fillStyle = textColor;
    g.font = smallFont;
    g.fillText('Uzyskaj 10 punktów          ' + scoreboard.getLines(), scoreX, scoreY + 60);
    g.fillText('Score:      ' + scoreboard.getScore(), scoreX, scoreY + 90);

    // preview
    var minX = 5, minY = 5, maxX = 0, maxY = 0;
    nextShape.pos.forEach(function (p) {
        minX = Math.min(minX, p[0]);
        minY = Math.min(minY, p[1]);
        maxX = Math.max(maxX, p[0]);
        maxY = Math.max(maxY, p[1]);
    });
    var cx = previewCenterX - ((minX + maxX + 1) / 2.0 * blockSize);
    var cy = previewCenterY - ((minY + maxY + 1) / 2.0 * blockSize);

    g.translate(cx, cy);
    nextShape.shape.forEach(function (p) {
        drawSquare(nextShape.ordinal, p[1], p[0]);
    });
    g.translate(-cx, -cy);

    if(scoreboard.getScore() >= 10)
    {
        fetchSuccess();
        scoreboard.undoScore(100);
    }
}

function drawNEWUI() {

    fillRect(outerRect, bgColor);
    fillRect(gridRect, gridColor);
    g.lineWidth = largeStroke;
    drawRect(previewRect, gridBorderColor);
    drawRect(gridRect, gridBorderColor);
    drawRect(outerRect, gridBorderColor);

}


function drawFallingShape() {
    var idx = fallingShape.ordinal;
    fallingShape.pos.forEach(function (p) {
        drawSquare(idx, fallingShapeRow + p[1], fallingShapeCol + p[0]);
    });
}

function animate(lastFrameTime) {
    var requestId = requestAnimationFrame(function () {
        animate(lastFrameTime);
    });
    var time = new Date().getTime();
    var delay = scoreboard.getSpeed();

    if (lastFrameTime + delay < time) {

        if (!scoreboard.isGameOver()) {

            if (canMove(fallingShape, down)) {
                move(down);
            } else {
                shapeHasLanded();
            }
            draw();
            lastFrameTime = time;

        } else {
            cancelAnimationFrame(requestId);
        }
    }
}

function startNewGame() {
    initGrid();
    selectShape();
    scoreboard.reset();
    animate(-1);
}

function initGrid() {
    function fill(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    }
    for (var r = 0; r < nRows; r++) {
        grid[r] = new Array(nCols);
        fill(grid[r], EMPTY);
        for (var c = 0; c < nCols; c++) {
            if (c === 0 || c === nCols - 1 || r === nRows - 1)
                grid[r][c] = BORDER;
        }
    }
}

function init() {
    initGrid();
    selectShape();
    draw();
}




const hackInfo = document.querySelector('#mainSpot');


init();

var timer;

function startTimer() {
  var currTime = fullTime;

  timer = setInterval(function() {
    --currTime;

    // Clear interval if time is up:
    if (!currTime) {
      clearInterval(timer);
    }

    // Prepend 0 if single-digit number:
    var txt = currTime.toString().length === 1 ? '0' + currTime : currTime;

    // Decrease the bar width:
    var w = (currTime / fullTime) * 100;
    $('.timer-bar').css({ 'width': w + '%' });

    // Manipulate bar according to the value:
    if (currTime === warn) {
      $('.timer-bar').addClass('timer-warn');
    }
    if (currTime === almost) {
      $('.timer-bar').addClass('timer-almost');
    }
    if (currTime === end) {
      resetTimer();
      fetchFailed();
    }
  }, 1000);
}




window.addEventListener('message', function(event) {
    if (event.data.type == "otworz") {
        drawStartScreen();
        resetTimer();
        hackInfo.style.display = 'block';
        startTimer();

        showDiv();

        playSound(sound1, 1000);

    } 
  })


