function initPlayer (startingX) {
	var newPlayer = {};

	newPlayer.reset = function () {
		newPlayer.x = startingX;
		newPlayer.y = canvas.height - newPlayer.height;
		newPlayer.maxSpeed = 15;
		newPlayer.xVelocity = 0;
		newPlayer.yVelocity = 0;
		newPlayer.jumping = false;
		newPlayer.walking = false;
		newPlayer.direction = 'right';
	};

	newPlayer.reset();

	var playerImg = new Image();
	var spriteSheetLength = 2;
	
	playerImg.onload = function () {
		newPlayer.y = height - playerImg.height;
		newPlayer.width = 87; //DONT TOUCH
		newPlayer.height = 120;
		newPlayer.spriteSheet = playerImg;
		newPlayer.xyArray = [width][height];

		newPlayer.rightStandingSprite = sprite({
			width: 75, //DONT TOUCH
			height: newPlayer.height,
			image: newPlayer.spriteSheet,
			numberOfFrames: 1,
			startingFrameIndex: 0,
			loop: false
		});

		newPlayer.leftStandingSprite = sprite({
			width: newPlayer.width, //DONT TOUCH
			height: newPlayer.height,
			image: newPlayer.spriteSheet,
			numberOfFrames: 1,
			startingFrameIndex: 0,
			loop: false
		}
											 
		 
											 );
		

		newPlayer.rightWalkingSprite = sprite({
		
			width: player.width, //DONT TOUCH
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 5,
			ticksPerFrame: 3,
			startingFrameIndex: 2,
			loop: true
		});

		newPlayer.leftWalkingSprite = sprite({
			width: player.width,
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 4,
			ticksPerFrame: 3,
			startingFrameIndex: 11,
			loop: true
		});

		newPlayer.rightJumpingSprite = sprite({
			width: 83,
			height: player.height+20,
			image: player.spriteSheet,
			numberOfFrames: 5,
			ticksPerFrame: 6,
			startingFrameIndex: 19,
			loop: true
		});

		newPlayer.leftJumpingSprite = sprite({
			width: 84,
			height: player.height+20,
			image: player.spriteSheet,
			numberOfFrames: 5,
			ticksPerFrame: 6,
			startingFrameIndex: 29,
			loop: true
		});

		function setCurrentSprite () {
			if (newPlayer.direction === 'left') {
				newPlayer.currentSprite = newPlayer.jumping ?
					newPlayer.leftJumpingSprite :
					(newPlayer.walking ? newPlayer.leftWalkingSprite : newPlayer.leftStandingSprite);
			}
			else {
				newPlayer.currentSprite = newPlayer.jumping ?
					newPlayer.rightJumpingSprite :
					(newPlayer.walking ? newPlayer.rightWalkingSprite : newPlayer.rightStandingSprite);
			}
		}

		newPlayer.update = function () {
			// apply physics
			player.xVelocity *= friction;
			player.yVelocity += gravity;

			// change player position
			player.x += player.xVelocity;
			player.y += player.yVelocity;
			player.canvasX = player.x;

			// check for background boundaries to change the background position
			// 0 + width/2 -> let player move up to 0
			if (player.x <= (canvas.width / 2) - (player.width /2)) {
				if (player.x <= 0) {
					player.x = 0;
				}
				player.canvasX = player.x;
			}
			// background.width - width/2 -> let player move up to background.width
			else if (player.x >= level.background.width - (canvas.width / 2) - (player.width /2)) {
				if (player.x >= level.background.width - player.width) {
					player.x = level.background.width - player.width;
				}
				player.canvasX = player.x - level.background.width + canvas.width;
			}
			// anything in between -> move both the background and the player
			else {
				player.canvasX = (canvas.width / 2) - (player.width /2);
			}

			// check for vertical boundaries
			if (player.y >= canvas.height - player.height) {
				player.y = canvas.height - player.height;
				player.jumping = false;
			}
			player.canvasY = player.y;

			setCurrentSprite();
			newPlayer.currentSprite.update();
		};

		newPlayer.render = function () {
			newPlayer.walking = newPlayer.xVelocity > 0.01 || newPlayer.xVelocity < -0.01;
			setCurrentSprite();
			newPlayer.currentSprite.render(newPlayer.canvasX, newPlayer.canvasY);
		};
	};

	newPlayer.collisionCheck = function (other) {
		var collisionObject = {
			// we don't want to check the entire sprite, just the reasonable part
			x: newPlayer.direction === 'left' ? newPlayer.x-10 : newPlayer.x-10,
			y: newPlayer.y-15,
			width: newPlayer.width,
			height: newPlayer.height
		};

		return checkColl(collisionObject, other);
	};

	playerImg.src = "imgs/ss9.png";

	return newPlayer;
}
