Math.randomBetween = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Enemies our player must avoid
var Enemy = function(rowNumber) {
    var imageWidth = 101;
    
    this.x = -imageWidth;
    this.y = this.getY(rowNumber);
    this.row = rowNumber;
    this.width = imageWidth;
    this.speed = Math.randomBetween(150, 400);;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.getY = function(rowNumber) {
	var imageHeight = 80,
		rowHeight = 83,
    	rowHightAdjustment = 60;

    return (rowHeight/2 - imageHeight/2) + rowHeight * (rowNumber - 1) + rowHightAdjustment;
};

Enemy.prototype.update = function(dt) {
    // Using dt to calculate x increment ensures the game runs at same speed on all computers
    var xIncrement = this.speed * dt

    this.x += xIncrement;

    if(this.x > ctx.canvas.width) this.reset();
};

Enemy.prototype.reset = function() {
	var rowNumber,
		rowNumberIsSameAsAllOtherEnemiesHave,
		enemiesOnSameRow,
		speed = Math.randomBetween(150, 400);
    
	do {
		rowNumber = Math.floor(Math.randomBetween(1, 3));
		enemiesOnSameRow = allEnemies.filter(function(enemy){ return enemy.row === rowNumber; }).length;
		rowNumberIsSameAsAllOtherEnemiesHave = enemiesOnSameRow === allEnemies.length;
	} while(rowNumberIsSameAsAllOtherEnemiesHave)

	this.x = -this.width;
    this.y = this.getY(rowNumber);
    this.row = rowNumber;
    this.speed = speed;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

	for(var i = 0; i < countOfEnemies; i++){
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


