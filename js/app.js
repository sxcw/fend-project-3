// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = this.getRandom();
    // this.speed = function getRandom() {
    //     return (Math.random())*200;
    // }();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (this.speed % 2 === 0) {
        this.sprite = 'images/enemy-bug.png';
        this.direction = "right";
    }
    else {
        this.sprite = 'images/enemy-bug2.png';
        this.direction = "left";
    }
    
};

// Enemy move function
Enemy.prototype.getRandom = function(){
    return Math.floor((Math.random()+0.3)*300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if (this.x<500) {
    //     this.x += (this.speed)*dt;
    //     if(this.x>500) {
    //         this.x = -300;
    //     }
    // }
    if (this.x<500 && this.direction == "right") {
        this.x += (this.speed)*dt;
        if(this.x>500) {
            this.x = -300;
        }
    }
    if (this.x>-250 && this.direction == "left") {
        this.x -= (this.speed)*dt;
        if(this.x<-250) {
            this.x = 600;
        }
    }
    this.checkCollisions(player);
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        if (player.lives <= 1) {
            player.lives = 0;
            alert ("You lost all your lives...");
            player.lives = 3;
        }
        else {
            player.lives -= 1;
        }
        
        document.getElementById("lives").innerHTML = "Lives: "+ player.lives;       
        player.reset();
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x * (dt);
    this.y * (dt);

    if (this.x < 40 || this.x > 400) {
        if(this.x < 40){
            this.x = 0;
        }
        else{
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if(this.y < 0){
            this.reset();
            // this.score += 1;
            // document.getElementById("score").innerHTML = "Score: "+ this.score;
        }
        else{
            this.y = 400;
        }
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key){
    // switch (key){
    //     case 'left':
    //         this.x = this.x-40;
    //         break;
    //     case 'right':
    //         this.x = this.x + 40;
    //          break;
    //     case 'up':
    //         this.y = this.y - 40;
    //         break;
    //     case 'down':
    //         this.y = this.y + 40;
    //         break;
    // };   
    if (key === 'left') {
        this.x-= 40;
    }
    else if (key === 'right') {
        this.x += 40;
    }
    else if (key === 'up') {
        this.y -= 40;
    }
    else {
        this.y += 40;
    };
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}
// Player.prototype.checkCollisions = function(){
//     for (i=0; i< allEnemies.length; i++){
//         if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
//             console.log("Deeecent");
//             this.resetPlayer();
//             allEnemies[i].bugReset();
//             break;
//     };
// };

// Player.prototype = Object.create(Enemy.prototype);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i=0; i<4; i++) {
    allEnemies.push(new Enemy((-200+i*30),(60+i*80),this.speed));
}

var player = new Player(200,380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

