Math.randomBetween = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var allEnemies = [];
var player = new Player(3,6);

(function () {

	var countOfEnemies = 4,
		startRow = 2,
		row = startRow,
		maxRow = 4,
		gameConfiguration = {
			enemyRow: { from: 2, to: 4 },
			cell: { height: 83, hightAdjustment: 20}
		},
		enemyConfiguration = {
			speed: { min: 200, max: 400 },
			sprite: { width: 95, height: 80, url:'images/enemy-bug.png' },
			game: gameConfiguration
		};
		

	for(var i = 0; i < countOfEnemies; i++){
		allEnemies.push(new Enemy(row, enemyConfiguration));

		row++;
		if(row > maxRow) row = startRow;
	}

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

}());
