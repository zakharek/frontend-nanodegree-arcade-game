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
    this.score = 0;
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
	this.column = 3;
	this.row = 6;
    this.x = this.getX(this.column);
    this.y = this.getY(this.row);
};