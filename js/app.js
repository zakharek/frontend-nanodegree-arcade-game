Math.randomBetween = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var Enemy = function(row) {
	//TODO: move all hardcoded values to configuration object
    var imageWidth = 95;
    this.sprite = 'images/enemy-bug.png';

    this.x = -imageWidth;
    this.y = this.getY(row);
    this.row = row;
    this.width = imageWidth;
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.getRandomSpeed = function(){
	//TODO: move all hardcoded values to configuration object
	return Math.randomBetween(150, 400);
}

Enemy.prototype.getY = function(row) {
	//TODO: move all hardcoded values to configuration object
	var imageHeight = 80,
		cellHeight = 83,
    	cellHightAdjustment = 20;

    return (cellHeight/2 - imageHeight/2) + cellHeight * (row - 1) - cellHightAdjustment;
};

Enemy.prototype.update = function(dt) {
    // Using dt to calculate x increment ensures the game runs at same speed on all computers
    var xIncrement = this.speed * dt

    this.x += xIncrement;

    var enemyLeftScreen = this.x > ctx.canvas.width;
    if(enemyLeftScreen) this.reset();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
	var row,
		enemiesOnSameRow,
		allEnemiesWillBeOnSameRow;
    
	do {
		//TODO: move all hardcoded values to configuration object
		row = Math.floor(Math.randomBetween(2, 4));

		enemiesOnSameRow = allEnemies.filter(function(enemy){ return enemy.row === row; }).length;
		allEnemiesWillBeOnSameRow = (enemiesOnSameRow + 1) === allEnemies.length;
	} while (allEnemiesWillBeOnSameRow && allEnemies.length > 1);

	this.x = -this.width;
    this.y = this.getY(row);
    this.row = row;
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.collidesWith = function(player) {
	var enemyHitAdjustmentX = this.width * 0.2,
		enemyLeftSideX = this.x + enemyHitAdjustmentX,
		enemyRightSideX = this.x +  this.width - enemyHitAdjustmentX,

		playerHitAdjustmentX = player.width * 0.3,
		playerLeftSideX = player.x + playerHitAdjustmentX,
		playerRightSideX = player.x +  player.width - playerHitAdjustmentX;

	if(this.row !== player.row) return;

    return enemyRightSideX > playerLeftSideX && enemyLeftSideX < playerRightSideX;
};

var Player = function(column, row) {
	//TODO: move all hardcoded values to configuration object
    var imageWidth = 101;
    
    //TODO: move all hardcoded values to configuration object
    this.sprite = 'images/char-boy.png';
    this.x = this.getX(column);
    this.y = this.getY(row);
    this.column = column;
    this.row = row;
    this.width = imageWidth;
};

Player.prototype.getX = function(column){
	//TODO: move all hardcoded values to configuration object
	var imageWidth = 101,
		cellWidth = 101;

    return (cellWidth/2 - imageWidth/2) + cellWidth * (column - 1);
}

Player.prototype.getY = function(row){
	//TODO: move all hardcoded values to configuration object
	var imageHeight = 171,
		cellHeight = 83,
    	cellHightAdjustment = 10;

    return (cellHeight/2 - imageHeight/2) + cellHeight * (row - 1) + cellHightAdjustment;
}

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.move = function(direction) {
    switch(direction) {
    	case 'left':
    		if(this.column > 1) this.column -= 1;
    		break;
		case 'up':
			if(this.row > 1) this.row -= 1;
    		break;
		case 'right':
			if(this.column < 5) this.column += 1;
    		break;
		case 'down':
			if(this.row < 6) this.row += 1;
    		break;
		default:
			return;
    }

    if(this.row === 1) this.reset();

    this.x = this.getX(this.column);
    this.y = this.getY(this.row);
};

Player.prototype.reset = function() {
	this.column = 3;
	this.row = 6;
    this.x = this.getX(this.column);
    this.y = this.getY(this.row);
};

var allEnemies = [];
var player = new Player(3,6);

(function () {

	var countOfEnemies = 3,
		row = 2,
		maxRow = 4;

	for(var i = 0; i < countOfEnemies; i++){
		allEnemies.push(new Enemy(row));

		row++;
		if(row > maxRow) row = 1;
	}

	document.addEventListener('keyup', function(e) {
	    var allowedKeys = {
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down'
	    };

	    player.move(allowedKeys[e.keyCode]);
	});

}());
