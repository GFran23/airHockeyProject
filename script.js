// Define Variables // 
let canvas = document.getElementById('canvas'); // get access to the canvas, specifically the 'context"
ctx = canvas.getContext('2d'); // Context is what is going on the Canvas
let computerScore = 0;
let playerScore = 0;
let puckSpeed = 10;
let xSpeed = 0;
let ySpeed = 0;
let xMin = 30;
let xMax = 500;
let yMin = 30;
let yMax = 650;
let pause = false;
let playerFx = new Audio("./assets/strikerFx.mp3");
let computerFx = new Audio("./assets/strikerFx.mp3");
let topBottomWallFx = new Audio("./assets/topBottomWallFx.mp3");
let sideWallFx = new Audio("./assets/sideWallFx.mp3");
let booFx = new Audio("./assets/booFx.mp3");
let gameOverFx = new Audio("./assets/gameOverFx.mp3");
let clapFx = new Audio("./assets/clapFx.mp3");
let goalScoreFx = new Audio("./assets/goalSoundFX.mp3");
let myAudio = new Audio(),
i = 0;
let playList = new Array("./assets/kidCudiMemories.mp3", "./assets/floRidaWildOnes.mp3", "./assets/taioCruz.mp3");

let isPlaying = false;

let player = {
    height: 54,
    width: 54,
    x: canvas.height / 2 - 27,
    y: canvas.width / 2 - 27,

}
let computer = {
    height: 54,
    width: 54,
    x: canvas.height / 2 - 27,
    y: canvas.width / 2 - 27,

}
let puck = {
    height: 38,
    width: 38,
    x: canvas.height / 2 - 19,
    y: canvas.width / 2 - 19,

}

// Initialize Variables // 
puck.img = new Image();
puck.img.src = './assets/redAirHockeyPuck.png';
computer.img = new Image();
computer.img.src = './assets/bostonBruins.png';

player.img = new Image();
player.img.src = './assets/nyIslanders.png';

playerFx.volume = 0.10;
playerFx.play();

computerFx.volume = 0.10;
computerFx.play();

topBottomWallFx.volume = 0.10;
topBottomWallFx.play();

sideWallFx.volume = 0.10;
sideWallFx.play();

booFx.volume = 0.06;
booFx.play();

gameOverFx.volume = 0.08;
gameOverFx.play();

clapFx.volume = 0.08;
clapFx.play();

goalScoreFx.volume = 0.07;
goalScoreFx.play();

// Function to loop through an array of audio files // 
myAudio.addEventListener('ended', function () {
    i = ++i < playList.length ? i : 0;
    console.log(i)
    myAudio.src = playList[i];
    myAudio.play();
}, true);
myAudio.volume = 0.03;
myAudio.loop = false;
myAudio.src = playList[0];
myAudio.play();

// Add event listener which looks for mouse movement //
document.addEventListener("mousemove", mouseMoveHandler); // First parameter is the type of the event, the second Parameter is the function we want to call when the event occurs

// Resets the scores to 0 // 
function reset() {
    computerScore = 0;
    playerScore = 0;
}

// Toggles the pause functionality //  
function togglePause() {
    if (pause == true) {
        pause = false;
    } else {
        pause = true;
    }
}

// Toggles audio playing // 
function togglePlay() {
    if (isPlaying) {
        myAudio.pause()
    } else {
        myAudio.play();
    }
};
myAudio.onplaying = function () {
    console.log("Audio Play");
    isPlaying = true;
};
myAudio.onpause = function () {
    console.log("Audio Pause");
    isPlaying = false;
};


function drawBoard() {
    // Draw The Air Hockey Table // 
    drawRect(0, 0, 520, 700, 1); // Setting the Width and Height For the Outer Square
    drawRect(30, 30, 460, 640, 0); // Setting the Width, Height, and Positiong of the Inner Square
    drawGoal(260, 28, 88, 1); // 180° circle in Front of Computer Goal
    drawGoal(260, 673, 89, 0); // 180° circle in Front of Player Goal
    drawCircle(260, 350, 75, 5); // 360° circle in Center of Board
    drawCircle(260, 350, 7, 8); // 360° Circle in the Circle in the Center of the Board

    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.moveTo(30, 350); // Horizontal and Vertical Positioning of Center Line
    ctx.lineTo(490, 350); // Horizontal and Vertical Positioning of Center Line
    ctx.stroke(); // Draws the Path defined with the moveTo() and lineTo methods
    ctx.closePath(); // Creates a Path from the current point back to the starting point

    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.moveTo(175, 30); // Horizontal and Vertical Positioning of lines by Computer Goalie 
    ctx.lineTo(345, 30); // Horizontal and Vertical Positioning of lines by Computer Goalie 
    ctx.lineWidth = 8; // Line Width of Player and Computer Goal
    ctx.strokeStyle = '#E6E6FA'; // Color of Goal Line
    ctx.stroke(); // Draws the Path defined with the moveTo() and lineTo methods
    ctx.closePath(); // Creates a Path from the current point back to the starting point


    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.moveTo(174, 670); // Horizontal and Vertical Positioning of lines by Player Goalie 
    ctx.lineTo(347, 670); // Horizontal and Vertical Positioning of lines by Player Goalie 
    ctx.stroke(); // Draws the Path defined with the moveTo() and lineTo methods
    ctx.closePath(); // Creates a Path from the current point back to the starting point


    ctx.font = '60px Helvetica'; // Font size and Style for the Score 
    ctx.lineWidth = 3 // Line width of the score 
    ctx.strokeStyle = '#4E2A84'; // Color Of Score
    ctx.strokeText(computerScore, 440, 335); // Horizontal and Vertical Positioning of Computer Score 
    ctx.strokeText(playerScore, 440, 405); // Horizontal and Vertical Positioning of Player Score 
}

function drawRect(x, y, w, h, b) {
    // Draw Square // 
    ctx.beginPath(); // Begins a Path, or resets the current Path
    if (b) {
        ctx.strokeStyle = '#000000'; // Set Outer Square Color 
        ctx.lineWidth = 60; // Set Outer Square Width
    } else {
        ctx.strokeStyle = '#8A2BE2'; // Set Inner Square Color
        ctx.lineWidth = 6; // Set Inner Square Width 
    }
    ctx.strokeRect(x, y, w, h);
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

function drawGoal(x, y, r, s) {
    // Draw Goal //
    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.lineWidth = 5;
    if (s)
        ctx.arc(x, y, r, 0, Math.PI); //  Create a circle with arc(): Set start angle to 0 and end angle to 2*Math.PI.
    else
        ctx.arc(x, y, r, Math.PI, 0);

    ctx.strokeStyle = '#8A2BE2'; // Set Goal Color
    ctx.stroke(); // Draws the Path defined with the moveTo() and lineTo methods
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

function drawCircle(x, y, r, w) {
    // Draw Circle // 
    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.lineWidth = w;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#0000ff'; // Color of Center Line and Circle
    ctx.stroke(); // Draws the Path defined with the moveTo() and lineTo methods
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

// Draw Player Striker // 
function drawPlayer(x, y) {

    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.drawImage(player.img, x, y, player.height, player.width);
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

// Draw Computer Striker // 
function drawComputer(x, y) {

    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.drawImage(computer.img, x, y, computer.height, computer.width);
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

// Draw Air Hockey Puck //
function drawPuck(x, y) {
    ctx.beginPath(); // Begins a Path, or resets the current Path
    ctx.drawImage(puck.img, x, y, puck.height, puck.width); //use this one!!
    ctx.closePath(); // Creates a Path from the current point back to the starting point

}

// Striker Function //
let Striker = function (x, y) {

    this.x = x;
    this.y = y - 10;

}
// Players Striker Object // 
let pStriker = new Striker(235, canvas.height - 80);

// Computer Striker Object //
let cStriker = new Striker(260, 80);

// Puck Class // 
let Puck2 = function (x, y) {

    this.x = x - 20;
    this.y = y;

}
// Puck Object //
let puck2 = new Puck2(canvas.width / 2, canvas.height - 370);

// Function to control Striker with Mouse Pointer //
function mouseMoveHandler(e) {
    console.log("Player Movement");
    let leftRightX = e.clientX - canvas.offsetLeft;
    let upDownY = e.clientY - canvas.offsetTop;

    if (leftRightX > 30 && leftRightX < canvas.width - 85) { // Set Horizontal Movement For Human Player
        pStriker.x = leftRightX;
    }
    if (upDownY > 340 && upDownY < 620) { // Set Vertical Movement For Human Player 
        pStriker.y = upDownY;
    }

}

// Function where all the magic happens // 
function drawAll() {
    if (pause == true) {
        return;
    }
    // when an object is moved the object will be cleared and re-drawn // 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the board // 
    drawBoard();
    // Draw Players Striker // 
    drawPlayer(pStriker.x, pStriker.y);
    // Draw Computers Striker // 
    drawComputer(cStriker.x, cStriker.y);
    // Draw the Puck // 
    drawPuck(puck2.x, puck2.y);

    let playerDistance = distance(pStriker.x, pStriker.y, puck2.x, puck2.y);

    let computerDistance = distance(cStriker.x, cStriker.y, puck2.x, puck2.y);

    function distance(x1, y1, x2, y2) { // Function for Puck Movement // 
        //console.log(Math.sqrt(tempx + tempy));
        let tempX = x2 - x1;
        let tempY = y2 - y1;
        tempX *= tempX;
        tempY *= tempY;
        return Math.sqrt(tempX + tempY);
    }

    // Condition to hit Puck for Player // 
    if (playerDistance < 45) {
        let dx = puck2.x - pStriker.x;
        let dy = puck2.y - pStriker.y;
        // console.log('dx = ' + dx);
        // console.log('dy = ' + dy);
        dx /= 30;
        dy /= 30;
        xSpeed = dx * puckSpeed;
        ySpeed = dy * puckSpeed;
        playerFx.play();

    }
    // Condition to hit Puck for Computer // 
    if (computerDistance < 45) {
        let cdx = puck2.x - cStriker.x;
        let cdy = puck2.y - cStriker.y;
        // console.log("cdx  = " + cdx);
        // console.log("cdy  = " + cdy);
        cdx /= 45;
        cdy /= 45;
        xSpeed = cdx * puckSpeed;
        ySpeed = cdy * puckSpeed;
        computerFx.play();

    }

    // Adjustments to the X and Y coordinate of the Puck Movement // 
    puck2.x += xSpeed;
    puck2.y += ySpeed;

    xSpeed.x *= .99;
    ySpeed *= .99;

    // condition to bounce the puck off the left-right walls // 
    if (puck2.x + xSpeed > canvas.width - 48 || puck2.x + xSpeed < +30) {
        xSpeed *= -1;
        sideWallFx.play();
    
    }
    let wasGoal = false;
    // condition to bounce the puck off the top-botom walls and goal logic // 
    if (puck2.x > 190 && puck2.x < 330) {
        if (puck2.y + ySpeed > canvas.height - 60) {
            console.log("Computer Goal");
            puck2.x = canvas.width / 2;
            puck2.y = canvas.height / 2 + 100;
            xSpeed = 0;
            ySpeed = 0;
            computerScore = computerScore + 1;
            goalScoreFx.play();
            booFx.play();
            wasGoal = true;

        } else if (puck2.y + ySpeed < 30) {
            console.log("Player Goal");
            puck2.x = canvas.width / 2;
            puck2.y = canvas.height / 2 - 100;
            xSpeed = 0;
            ySpeed = 0;
            playerScore = playerScore + 1;
            goalScoreFx.play();
            clapFx.play();
            wasGoal = true;

        }
    } else {
        if (puck2.y + ySpeed > canvas.height - 60 || puck2.y + ySpeed < 30) {
            ySpeed *= -1;
            topBottomWallFx.play();
        }
    }

    if (wasGoal) {

        console.log("Someone  scored");
        canvas.style.backgroundColor = getRandomColor(); // Responsible for setting the background color on the Canvas to a Random Color when a score is made
        togglePause();
        setTimeout(resetBackground, 1500);
    }

    if (playerScore == 3 || computerScore == 3) {
        reset();
        if (playerScore == 3) {
            //alert("Well done player");

        } else {
            //alert("You have been defeated");
            gameOverFx.play();


        }
    }

    let computerDifficulty = false; // Computer Difficulty 
    let computerReaction = 5; // Computer Player Reaction to hitting the puck
    let computerSpeed; // Speed Computer Player moves side to side
    if (computerDifficulty) {
        computerReaction = 2; // If hard make number larger so computer player hits puck diagnolly
    }

    if ((Math.abs(xSpeed) + Math.abs(ySpeed)) < 10 && puck2.y <= canvas.height / 2) {
        if (puck2.y - 20 > cStriker.y) {
            cStriker.y += 2;
        } else {
            cStriker.y -= 2;
        }
    } else if (cStriker.y > 100) {
        cStriker.y -= 2;
    } else if (cStriker.y < 100) {
        cStriker.y += 2;
    }


    // Make sure You or CPU doesn't go past the line or go off screen // 
    if (cStriker.x < xMin) {
        cStriker.x = xMin, canvas.height, canvas.width + 10;
    }
    if (cStriker.x > xMax) {
        cStriker.x = xMax, canvas.height, canvas.width + 10;
    }
    if (cStriker.y < yMin) {
        cStriker.y = yMin, canvas.height, canvas.width + 20;
    }
    if (cStriker.y > yMax) {
        cStriker.y = yMax;
    }

    // Set CPU's speed depending on difficulty  //
    if (!computerDifficulty) {
        computerSpeed = 4;
    } else {
        computerSpeed = 5;
    }

    // If the puck is behind CPU, it moves out of the way  //
    if (puck2.y < cStriker.y && puck2.x > cStriker.x - 30 && puck2.x < cStriker.x + 30) {
        computerSpeed = -2;
    }
    // Make CPU move towards the puck x coordinate // 
    if (cStriker.x < puck2.x + computerReaction) {
        cStriker.x += computerSpeed;
    }
    if (cStriker.x > puck2.x - computerReaction) {
        cStriker.x -= computerSpeed;
    }

}
setInterval(drawAll, 10); // Calling a JavaScript library function which recalls another function every number of milliseconds(ms)

function resetBackground() {
    canvas.style.backgroundColor = "#f5f5f5";
    togglePause();
}

function getRandomColor() { // Responsible for returning a random hex value for color.

    //     // creating a random number between 0 and 255
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    //     // going from decimal to hex
    let hexR = r.toString(20);
    let hexG = g.toString(20);
    let hexB = b.toString(20);

    //     // making sure single character values are prepended with a "0"
    if (hexR.length == 1) {
        hexR = "0" + hexR;
    }

    if (hexG.length == 1) {
        hexG = "0" + hexG;
    }

    if (hexB.length == 1) {
        hexB = "0" + hexB;
    }

    //     // creating the hex value by concatenatening the string values
    let hexColor = "#" + hexR + hexG + hexB;
    return hexColor.toUpperCase();
}