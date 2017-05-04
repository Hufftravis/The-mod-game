var requestAnimationFrame, canvas, context, timeout, width, height, keys, player, friction, gravity, down, dead;
var score, scoreCard;
var levelCleared = false;
var levelCount = 1;
var jump, left, right, down;

(initialize());

function initialize () {
		document.getElementById('music').play();
	



	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimation || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	// these can be arbitrary, but should be less than the background image dimensions
	// height can be the same if there will be no vertical change in background
	width = 800;
	height = 600;
	canvas.width = width *.45;
	canvas.height = height*.9;

	level = initLevel(1);

	score = 0;
	scoreCard = document.getElementById('score');
	scoreCard.innerHTML = score;

	keys = [];
	friction = .88;
	gravity = 1.2;
	dead = false;
	down = false;
	player = initPlayer(width / 4);
	


}



// on page load
window.addEventListener('load', function () {
	update();
});

// on keydown event
document.body.addEventListener('keydown', function (e) {
	keys[e.keyCode] = true;
});

// on keyup event
document.body.addEventListener('keyup', function (e) {
	keys[e.keyCode] = false;
});

//document.getElementById("bod").addEventListener("touchstart", function(e){
//	jump = true; 
//});

document.getElementById("bod").addEventListener("touchmove", function(e){
var touch = event.touches[0];
var x = touch.pageX;
		if(x >= 180){
		right = true;
		left = false;
	}
	if(x < 180){
		left = true;
		right = false;
	}
	
var y = touch.pageY;
		if(y>460){
			right = false;
			left = false;
		}

});

document.body.addEventListener('touchmove', function(e){


});

document.body.addEventListener("touchstart", tapHandler);


var tapedTwice = false;

function tapHandler(event) {
    if(!tapedTwice) {
        tapedTwice = true;
        setTimeout( function() { tapedTwice = false; }, 300 );
        return false;
    }
    event.preventDefault();
    //action on double tap goes below
    jump = true;
 }


// update the game canvas
function updateGame () {

	// check for keys pressed
	if (keys[38] || keys[32] || jump === true) {
		// up arrow || space bar
		if (!player.jumping) {
			player.jumping = true;
			player.yVelocity = -player.maxSpeed * 2;
			down = false;

		}
		jump = false;
	}
	if (keys[39] || right === true) {
		// right arrow
		player.direction = 'right';
		if (player.xVelocity < player.maxSpeed) {
			player.xVelocity++;
			down = false;
		}
		right = false;
	}
	if (keys[37] || left === true) {
		// left arrow
		player.direction = 'left';
		if (player.xVelocity > -player.maxSpeed) {
			player.xVelocity--;
			down = false;
		}
		left = false;

	}
	
		if (keys[40]) {
		// down arrow
			down = true;
			player.jumping = true;
			player.yVelocity= player.maxSpeed*2;

		}

	// clear the canvas
	//NOT WORKING PLS FIX
	context.clearRect(0, 0, canvas.width, canvas.height);
	
			

	
	
	if(dead === 'true'){
		context.fillStyle = 'gray';
		context.font = '4em "VT323"';
		var message = 'YOU DIED';
		context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/2);
		// display the message for 2 seconds before clearing it and starting a new level
		if (timeout === undefined) {
			timeout = window.setTimeout(function () {
				levelCleared = false;
				levelCount--;
				level.currentScore = 0;
				level.reset(level.maxScore + Math.ceil(level.maxScore/2));
				player.reset();
				window.clearTimeout(timeout);
				timeout = undefined;
			}, 2000);
			return;
		}
	}
	else if (!levelCleared) {
		// update player and level info
		player.update();
		level.update();

		// draw player and level
		// we want the level to be on the bottom, so we need to draw it first
		level.render();
		player.render();
	}
	
	else if(levelCleared === true){
				if(levelCount == 20){
			context.fillStyle = 'gray';
		context.font = '4em "VT323"';
		var message = 'YOU WIN';
	
		context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/2);
					if (timeout === undefined) {
			timeout = window.setTimeout(function () {
				levelCleared = false;
				levelCount++;
				level.reset(level.maxScore + Math.ceil(level.maxScore/2));
				player.reset();
				window.clearTimeout(timeout);
				timeout = undefined;
	
			
			}, 2000000);
		}
			
		}
		else{
		// setup a message to display
		context.fillStyle = 'gray';
		context.font = '4em "VT323"';

		var message = 'Level ' + levelCount + ' cleared!';
		context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/2);
		// display the message for 2 seconds before clearing it and starting a new level
		if (timeout === undefined) {
			timeout = window.setTimeout(function () {
				levelCleared = false;
				levelCount++;
				level.reset(level.maxScore + Math.ceil(level.maxScore/2));
				player.reset();
				window.clearTimeout(timeout);
				timeout = undefined;
	
			
			}, 2000);
		}
		}
	}
}

// collision detection
function checkColl (obj1, obj2) {
	return (obj1.x + obj1.width >= obj2.x)
		&& (obj1.x <= obj2.x + obj2.width)
		&& (obj1.y <= obj2.y + obj2.height)
		&& (obj1.y + obj1.height >= obj2.y);
}

function incrementScore(butterfly) {
	if (!butterfly.captured) {
		butterfly.capture();
		level.currentScore++;
		scoreCard.innerHTML = score + level.currentScore;

		if (level.currentScore === level.maxScore + 10) {
			levelCleared = true;
			score = score + level.currentScore;
			scoreCard.innerHTML = score;
		}
	}

}



// on frame draw
function update () {
	updateGame();
	// update frame
	requestAnimationFrame(update);
}