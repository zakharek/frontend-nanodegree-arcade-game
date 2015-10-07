// Enemies our player must avoid
var Enemy = function(rowNumber) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    var imageWidth = 101;
    
    this.x = -imageWidth;
    this.y = this.getY(rowNumber);
    this.row = rowNumber;
    this.width = imageWidth;
    this.speed = Math.randomBetween(150, 400);;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.getY = function(rowNumber) {
	var imageHeight = 80;
    var rowHeight = 83;
    var rowHightAdjustment = 60;

    return (rowHeight/2 - imageHeight/2) + rowHeight * (rowNumber - 1) + rowHightAdjustment;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    if(this.x > ctx.canvas.width) this.reset();
};

Enemy.prototype.reset = function() {
	var rowNumber,
		rowNumberIsNotSameAsOtherEnemiesHave,
		enemiesOnSameRow,
		speed = Math.randomBetween(150, 400);
    
	while(true){
		rowNumber = Math.floor(Math.randomBetween(1, 3));
		enemiesOnSameRow = allEnemies.filter(function(enemy){ return enemy.row === rowNumber; });
		rowNumberIsNotSameAsOtherEnemiesHave = enemiesOnSameRow.length < (allEnemies.length - 1);

		if(rowNumberIsNotSameAsOtherEnemiesHave) break;
	}

	this.x = -this.width;
    this.y = this.getY(rowNumber);
    this.row = rowNumber;
    this.speed = speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Math.randomBetween = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

(function () {

	var countOfEnemies = 3,
		row = 1,
		maxRow = 3;

	for(var i = 1; i <= countOfEnemies; i++){
		allEnemies.push(new Enemy(row));

		row++;
		if(row > maxRow) row = 1;
	}

}());


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //player.handleInput(allowedKeys[e.keyCode]);
});
