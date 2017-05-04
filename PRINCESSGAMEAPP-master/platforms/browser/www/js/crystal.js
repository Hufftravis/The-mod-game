function initCrystal (startingX, startingY) {
	var newCrystal = {};
	newCrystal.x = startingX;
	newCrystal.y = startingY;
	newCrystal.captured = false;

	var crystalImg = new Image();
	crystalImg.onload = function () {
		newCrystal.width = crystalImg.width;
		newCrystal.height = crystalImg.height;

		newCrystal.spriteSheet = crystalImg;

		newCrystal.flyingSprite = sprite({
			width: newCrystal.width,
			height: newCrystal.height,
			image: newCrystal.spriteSheet,
			numberOfFrames: 0,
			startingFrameIndex: 0,
			ticksPerFrame: (Math.random() * 10) + 8,  // random wing flap rate between 8 and 18
			loop: true
		});

		newCrystal.render = function () {
			newCrystal.flyingSprite.render(newCrystal.canvasX, newCrystal.canvasY);
		};

		newCrystal.update = function () {
			newCrystal.flyingSprite.update();
		};
	};

	newCrystal.capture = function() {
		newCrystal.captured = true;
	};

	crystalImg.src = "imgs/crystal2.png";

	return newCrystal;
}
