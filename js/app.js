// Enemies our player must avoid
var Enemy = function(rowNumber, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    var imageWidth = 101;
    var imageHeight = 80;
    var rowHeight = 83;
    var rowHightAdjustment = 60;

    this.x = -imageWidth;
    this.y = (rowHeight/2 - imageHeight/2) + rowHeight * (rowNumber - 1) + rowHightAdjustment;
    this.width = imageWidth;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
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
    this.x = -this.width;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

(function () {
	var countOfEnemies = 3;

	for(var i = 1; i <= countOfEnemies; i++){
		allEnemies.push(new Enemy(i, 200));
	}

}());



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
