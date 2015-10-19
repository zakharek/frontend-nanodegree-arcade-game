var Enemy = function(row, config) {
	this.config = config;
	this.width = config.sprite.width;
	
	this.x = -this.width;
	this.y = this.getY(row);
	this.row = row;
	this.speed = this.getRandomSpeed();
};

Enemy.prototype.getRandomSpeed = function(){
	return Math.randomBetween(this.config.speed.min, this.config.speed.max);
};

Enemy.prototype.getY = function(row) {
	var cell = this.config.game.cell;

	return (cell.height/2 - this.width/2) + cell.height * (row - 1) - cell.heightAdjustment;
};

Enemy.prototype.update = function(dt) {
	// Using dt to calculate x increment ensures the game runs at same speed on all computers
	var xIncrement = this.speed * dt;

	this.x += xIncrement;

	var enemyLeftScreen = this.x > ctx.canvas.width;
	if(enemyLeftScreen) this.reset();
};

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.config.sprite.url), this.x, this.y);
};

Enemy.prototype.reset = function() {
	var row,
		enemiesOnSameRow,
		allEnemiesWillBeOnSameRow;
	
	do {
		row = Math.floor(Math.randomBetween(this.config.game.enemyRow.from, this.config.game.enemyRow.to));

		enemiesOnSameRow = allEnemies.filter(function(enemy){ return enemy.row === row; }).length;
		allEnemiesWillBeOnSameRow = (enemiesOnSameRow + 1) === allEnemies.length;
	} while (allEnemiesWillBeOnSameRow && allEnemies.length > 1);

	this.x = -this.width;
	this.y = this.getY(row);
	this.row = row;
	this.speed = this.getRandomSpeed();
};

Enemy.prototype.collidesWith = function(player) {
	var enemyHitAdjustmentX = this.width * 0.3,
		enemyLeftSideX = this.x + enemyHitAdjustmentX,
		enemyRightSideX = this.x +  this.width - enemyHitAdjustmentX,
		playerHitAdjustmentX = player.width * 0.35,
		playerLeftSideX = player.x + playerHitAdjustmentX,
		playerRightSideX = player.x +  player.width - playerHitAdjustmentX;

	if(this.row !== player.row) return false;

	return enemyRightSideX > playerLeftSideX && enemyLeftSideX < playerRightSideX;
};