// Enemies the player must avoid
var Enemy = function(x,y) {
    // assigns starting x and y coordinates and movement speed
    // of each instance of enemy.
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 350) + 100);

    // the image/sprite for enemies.
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
    // if the enemy moves outside the canvas, reset its position.
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -50;
    }
    // detect for a collision between player and enemy, if
    // detected call the player reset function.
    if (player.x < this.x + 55 &&
        player.x + 55 > this.x &&
        player.y < this.y + 55 &&
        55 + player.y > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class and initial x and y coordinates.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//Update player position
Player.prototype.update = function(){
    // if the up key is pressed then decrement the y value.
    if (this.ctlKey === 'up') {
        this.y = this.y - 83;
    // if the left key is pressed, and the player object will
    // remain on the canvas, then decrement the x value.
    } else if (this.ctlKey === 'down' && this.y < 357) {
        this.y = this.y + 83;
    // if the left key is pressed, and the player object will
    // remain on the canvas, then decrement the x value.
    } else if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
    // if the right key is pressed, and the player object will
    // remain on the canvas, then increment the x value.
    } else if (this.ctlKey === 'right' && this.x < 303) {
        this.x = this.x + 101;
    }
    this.ctlKey = null;

    // if the player reaches the water at the top of the canvas,
    // then call the reset function.
    if (this.y < 50) {
        this.reset();
    }
};

// Draw the player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// input handler for player.
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// resets player to beginning position.
Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
};

// instantiate enemy and player objects.
var allEnemies = [];

function setEnemies() {
    allEnemies.push(new Enemy(-50, 65));
    allEnemies.push(new Enemy(-50,145));
    allEnemies.push(new Enemy(-50,230));
    allEnemies.push(new Enemy(-50,310));
}

setEnemies();
var player = new Player();


// listen for key presses and send the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});