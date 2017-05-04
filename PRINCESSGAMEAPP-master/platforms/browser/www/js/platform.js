function initPlatform (startingX, startingY) {
	var newPlatform = {};
	newPlatform.x = startingX;
	newPlatform.y = startingY;
	newPlatform.captured = false;

	var platformImg = new Image();
	platformImg.onload = function () {
		newPlatform.width = platformImg.width;
		newPlatform.height = platformImg.height;

		newPlatform.spriteSheet = platformImg;

		newPlatform.flyingSprite = sprite({
			width: newPlatform.width,
			height: newPlatform.height,
			image: newPlatform.spriteSheet,
			numberOfFrames: 0,
			startingFrameIndex: 0,
			ticksPerFrame: (Math.random() * 10) + 8,  // random wing flap rate between 8 and 18
			loop: true
		});

		newPlatform.render = function () {
			newPlatform.flyingSprite.render(newPlatform.canvasX, newPlatform.canvasY);
		};

		newPlatform.update = function () {
			newPlatform.flyingSprite.update();
		};
	};

	newPlatform.capture = function() {
		newPlatform.captured = true;
	};

	platformImg.src = "imgs/platform.png";

	return newPlatform;
}
