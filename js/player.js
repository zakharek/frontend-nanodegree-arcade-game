var Player = function(config) {
	this.config = config;
    this.width = config.sprite.width;
    this.height = config.sprite.height;
    this.sprite = config.sprite.url;
    this.x = this.getX(config.defaultColumn);
    this.y = this.getY(config.defaultRow);
    this.column = config.defaultColumn;
    this.row = config.defaultRow;
    this.score = 0;
};  


Player.prototype.getX = function(column){
	var cell = this.config.game.cell;
	
    return (cell.width/2 - this.width/2) + cell.width * (column - 1);
}

Player.prototype.getY = function(row){
	var cell = this.config.game.cell;
	
    return (cell.height/2 - this.height/2) + cell.height * (row - 1) + cell.heightAdjustmentPlayer;
}

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font="30px Verdana";
    ctx.fillStyle = 'yellow';
    ctx.fillText(this.score, 30, 100);
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

    this.x = this.getX(this.column);
    this.y = this.getY(this.row);
};

Player.prototype.reset = function() {
	this.column = this.config.defaultColumn;
	this.row = this.config.defaultRow;
    this.x = this.getX(this.column);
    this.y = this.getY(this.row);
};