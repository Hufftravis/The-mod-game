function initBlack (startingX, startingY) {
	var black = {};
	black.x = startingX;
	black.y = startingY;
	black.captured = false;

	var blackImg = new Image();
	blackImg.onload = function () {
		black.width = 60;
		black.height = blackImg.height;

		black.spriteSheet = blackImg;

		black.flyingSprite = sprite({
			width: black.width,
			height: black.height,
			image: black.spriteSheet,
			numberOfFrames: 0,
			startingFrameIndex: 0,
			ticksPerFrame: (Math.random() * 10) + 8,  // random wing flap rate between 8 and 18
			loop: true
		});

		black.render = function () {
			black.flyingSprite.render(black.canvasX, black.canvasY);
								

		};

		black.update = function () {
			black.flyingSprite.update();
	
		};
	};

	black.capture = function() {
		black.captured = true;
		black.x = undefined;
		black.y = undefined;
	};

	blackImg.src = "imgs/blackheart.png";

	return black;
}
