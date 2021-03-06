Math.randomBetween = function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

(function (global) {

	var COUNT_OF_ENEMIES = 4,
		START_ROW = 2,
		row = START_ROW,
		MAX_ROW = 4,
		gameConfiguration = {
			enemyRow: { from: 2, to: 4 },
			cell: { height: 83, width: 101, heightAdjustment: 20, heightAdjustmentPlayer:10 }
		},
		enemyConfiguration = {
			speed: { min: 200, max: 400 },
			sprite: { width: 95, height: 80, url:'images/enemy-bug.png' },
			game: gameConfiguration
		},
		playerConfiguration = {
			defaultColumn: 3,
			defaultRow: 6,
			sprite: { width: 101, height: 171, url:'images/char-boy.png' },
			game: gameConfiguration
		},
		allEnemies = [],
		player = new Player(playerConfiguration);

	for(var i = 0; i < COUNT_OF_ENEMIES; i++){
		allEnemies.push(new Enemy(row, enemyConfiguration));

		row++;
		if(row > MAX_ROW) row = START_ROW;
	}

	global.allEnemies = allEnemies;
	global.player = player;

	document.addEventListener('keydown', function(e) {
		var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};

		var direction = allowedKeys[e.keyCode];

		player.move(direction);

		if(player.row === 1) {
			player.score += 1;
			player.reset();
		}
	});

}(window));
