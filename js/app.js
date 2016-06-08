// invoke strict mode.
"use strict";

var Character = function(x,y) {
    // creates an instance of Character superclass taking x and y
    // coordinates as inputs.
    this.x = x;
    this.y = y;
}

// Enemies the player must avoid
var Enemy = function(x,y) {
    // creates an instance of the Enemy subclass, assigns the sprite,
    // and the movement speed of each instance of enemy. x and y
    // coordinates are inherited from the Character superclass.
    Character.call(this, x,y)
    this.speed = Math.floor((Math.random() * 350) + 100);
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

// creates an instance of the Player subclass and assigns the sprite.
// x and y coordinates are inherited from the Character superclass.
var Player = function(x,y) {
    Character.call(this, x,y)
    this.sprite = 'images/char-boy.png';
};

//Update player position
Player.prototype.update = function() {
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
Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
};

// resets player to beginning position.
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// instantiate enemy and player objects.
var allEnemies = [
    new Enemy(-50, 65),
    new Enemy(-50,145),
    new Enemy(-50,230),
    new Enemy(-50,310),
    ];

var player = new Player(200,400);

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