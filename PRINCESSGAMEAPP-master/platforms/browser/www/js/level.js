function initLevel(numButterflies) {
	var newLevel = {};
	newLevel.maxScore = numButterflies;
	newLevel.currentScore = 0;
	var levelnum = 1;		
	
	// start the background at the top left edge
	newLevel.background = {
		x: 0,
		y: 0
	};
	
	newLevel.foreground = {
		x: 0,
		y: 300
	};
	// background image
	backgroundImg = new Image();
	//foreground image
	foregroundImg = new Image();
	
	healthImg = new Image();

	var rectangle = {rx:10,ry:10,rwidth:200,rheight:50}
	
	backgroundImg.onload = function () {
		// make the size of the level accessible to the game
		
		newLevel.background.width = backgroundImg.width;
		newLevel.background.height = backgroundImg.height;
		
		generateButterflies();
		generateCrystals();
		generatePlatforms();
		generateHealth();
		generateBlack();
		
		
		};

	function generateButterflies() {
		newLevel.butterflies = [];

		// place butterflies randomly throughout the level
		for (var i = 0; i < newLevel.maxScore+35; i++) {
			newLevel.butterflies.push(initButterfly((Math.random() * (level.background.width - canvas.width)) + 600,
				(Math.random() * (level.background.height/3))));
		}
}
	
	function generateCrystals(){
		newLevel.crystals = [];
		for(var j = 0; j < 8; j++){
			newLevel.crystals.push(initCrystal((Math.random() * (level.background.width - canvas.width)) + 600,
				(350)));
			
		}
	}
	
	function generatePlatforms(){
		newLevel.platforms = [];
		for(var k = 0; k < 10; k++){
			newLevel.platforms.push(initPlatform((Math.random() * (level.background.width - canvas.width)) + 100,
				(300)));
		}
	}
	
		function generateHealth(){
		newLevel.healths = [];
		for(var o = 0; o < 8; o++){
			newLevel.healths.push(initHealth((Math.random() * (level.background.width - canvas.width)) + 800,
				(Math.random() * (level.background.height/2))));
		}	
	}
	
			function generateBlack(){
		newLevel.blackhearts = [];
		for(var o = 0; o < 10; o++){
			newLevel.blackhearts.push(initBlack((Math.random() * (level.background.width - canvas.width)) + 200,
				(level.background.height-500)));
		}
	}
	
	function changeBackground(){
		if(levelCount === 3 || levelCount == 4){
			backgroundImg.src = "imgs/bgevening.png";
		}
		
		if(levelCount == 5 || levelCount == 6){
			backgroundImg.src = "imgs/bgnight.png";
		}
		
		if(levelCount === 7 || levelCount == 8){
			backgroundImg.src = "imgs/bgdawn.png";
		}
		
		if(levelCount == 9 || levelCount == 10){
			backgroundImg.src = "imgs/bgspace1.png";
		}
		
		if(levelCount === 11 || levelCount == 12){
			backgroundImg.src = "imgs/bgspace2.png";
		}
		
		if(levelCount == 13 || levelCount == 14){
			backgroundImg.src = "imgs/bgspace3.png";
		}	
		
		if(levelCount == 15 || levelCount == 16){
			backgroundImg.src = "imgs/bgspace4.png";
		}	
		
		if(levelCount == 17 || levelCount == 18){
			backgroundImg.src = "imgs/bgspace5.png";
		}	
		
		if(levelCount == 19 || levelCount == 20){
			backgroundImg.src = "imgs/bgspace6.png";
		}
	}

	newLevel.update = function () {
		

		// we need to move our background in relation to the player
		// 0 + width/2 -> don't move the background
		if (player.x <= (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = 0;
			newLevel.foreground.x = 0;
		}
		// background.width - width/2 -> don't move the background
		else if (player.x >= level.background.width - (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = -(level.background.width - canvas.width);
			newLevel.foreground.x = -(level.foreground.width - canvas.width);
		}
		// anything in between -> move both the background and the player
		else {
			level.background.x -= player.xVelocity;
			level.foreground.x -= player.xVelocity;
		}
		// update the butterflies that are on screen
		for (var index in level.butterflies) {
			var butterfly = level.butterflies[index];
			if (!butterfly.captured) {
				if (butterfly.x >= -(level.background.x) - butterfly.width && butterfly.x <= -(level.background.x) + canvas.width) {
					butterfly.canvasX = butterfly.x + level.background.x;
					butterfly.canvasY = butterfly.y;
				}
				else {
					butterfly.canvasX = undefined;
					butterfly.canvasY = undefined;
				}
			}
		}
		
		for(var index in level.crystals){
			var crystal = level.crystals[index];
			crystal.canvasX = crystal.x + level.background.x;
			crystal.canvasY = crystal.y;
		}
		
		for(var index in level.platforms){
			var platform = level.platforms[index];
			platform.canvasX = platform.x + level.background.x;
			platform.canvasY = platform.y;
		}
		
		for (var index in level.healths) {
			var health = level.healths[index];
			if (!health.captured) {
				if (health.x >= -(level.background.x) - health.width && health.x <= -(level.background.x) + canvas.width) {
					health.canvasX = health.x + level.background.x;
					health.canvasY = health.y;
				}
				else {
					health.canvasX = undefined;
					health.canvasY = undefined;
				}
			}
		}	
		
		for (var index in level.blackhearts) {
			var black = level.blackhearts[index];
			if (!black.captured) {
				if (black.x >= -(level.background.x) - black.width && black.x <= -(level.background.x) + canvas.width) {
					black.canvasX = black.x + level.background.x;
					black.canvasY = black.y;
					black.y+=.5;
				}
				else {
					black.canvasX = undefined;
					black.canvasY = undefined;
				}
			}
		}
	};

	newLevel.render = function () {
		// draw the background
		context.drawImage(backgroundImg, newLevel.background.x, newLevel.background.y);
		
    context.fillStyle = "purple";
   	context.fillRect(rectangle.rx,rectangle.ry,200,rectangle.rheight);
    context.fillStyle = "violet";
    context.fillRect(rectangle.rx,rectangle.ry,rectangle.rwidth,rectangle.rheight);


		// update and render our butterflies
		for (index in level.butterflies) {
			butterfly = level.butterflies[index];
			if (player.collisionCheck(butterfly)) {
				incrementScore(butterfly);

			}
			// update and render our butterflies, if they have loaded.
			if (butterfly.update && butterfly.render && !butterfly.captured) {
				butterfly.update();
				butterfly.render();
			}
		}
		
		for(index in level.crystals){
			crystal = level.crystals[index];
			
			if(player.collisionCheck(crystal)){
				if(player.x >= crystal.x){
				// bouncing back when hitting crystal depending on direction
					player.xVelocity++;
					rectangle.rwidth--;
					if(rectangle.rwidth === 0){
						dead = 'true';
						newLevel.update();					
					}
				}
				if(player.x <= crystal.x){
				//bouncing back when hitting crystal depending on direction
					player.xVelocity--;
					rectangle.rwidth--;
						if(rectangle.rwidth === 0){
							dead = 'true';
							newLevel.update();
					}
				}

			}
				if (crystal.update && crystal.render && !crystal.captured) {
					crystal.update();
					crystal.render();
			}					
		}		
		
		for(index in level.platforms){
			platform = level.platforms[index];
			if(down === false){
				if(player.collisionCheck(platform)){
					if(platform.y <= player.y || platform.height <= player.y){
					//player.xVelocity = 0;
					player.walking = true;
					player.jumping = false;					
					player.y = platform.height+155;
					//player.walking = 'true';				
					player.yVelocity = 0;

					}
				}
			}
				if (platform.update && platform.render && !platform.captured) {
					platform.update();
					platform.render();					
					}
		}
			
		for (index in level.healths) {
			health = level.healths[index];
			if (player.collisionCheck(health)) {
				if(rectangle.rwidth < 200){
				rectangle.rwidth+= 5;
				health.capture();
			}
				health.capture();
		}
			// update and render our butterflies, if they have loaded.
			if (health.update && health.render && !health.captured) {
				health.update();
				health.render();	
			}
		}		
		
		for (index in level.blackhearts) {
			black = level.blackhearts[index];
			if (player.collisionCheck(black)) {
				rectangle.rwidth-=2;
					if(rectangle.rwidth === 0){
							dead = 'true';
							newLevel.update();
							black.capture();
					}
				black.capture();				
			}
			// update and render our butterflies, if they have loaded.
			if (black.update && black.render && !black.captured) {
				black.update();
				black.render();				
			}
		}
	};

	newLevel.reset = function(newMaxScore) {
		changeBackground();
		newLevel.maxScore = newMaxScore;
		newLevel.currentScore = 0;
		// make new butterflies
		generateButterflies();
		generateCrystals();
		generatePlatforms();
		generateHealth();
		generateBlack();
		
		// reset background x, y
		newLevel.background.x = 0;
		newLevel.background.y = 0;

	};




		//backgroundImg.src = "imgs/bgevening.png";



		//backgroundImg.src = "imgs/bgnight.png";
	
 
	backgroundImg.src = "imgs/bgday.png";
	healthImg.src = "imgs/healthbar.png";


	return newLevel;
}
