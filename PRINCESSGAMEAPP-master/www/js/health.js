function initHealth (startingX, startingY) {
	var health = {};
	health.x = startingX;
	health.y = startingY;
	health.captured = false;

	var healthImg = new Image();
	healthImg.onload = function () {
		health.width = 60;
		health.height = healthImg.height;

		health.spriteSheet = healthImg;

		health.flyingSprite = sprite({
			width: health.width,
			height: health.height,
			image: health.spriteSheet,
			numberOfFrames: 0,
			startingFrameIndex: 0,
			ticksPerFrame: (Math.random() * 10) + 8,  // random wing flap rate between 8 and 18
			loop: true
		});

		health.render = function () {
			health.flyingSprite.render(health.canvasX, health.canvasY);
								

		};

		health.update = function () {
			health.flyingSprite.update();
	
		};
	};

	health.capture = function() {
		health.captured = true;
		health.x = undefined;
		health.y = undefined;
	};

	healthImg.src = "imgs/health.png";

	return health;
}
