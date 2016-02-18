 "use strict";
 // Enemies our player must avoid
 var Enemy = function(x, y, speed) {
     this.x = x;
     this.y = y;
     this.speed = this.getRandom();
     // The image/sprite for our enemies
     // Randomly decides if the bug goes left to right or right to left
     if (this.speed % 2 === 0) {
         this.sprite = 'images/enemy-bug.png';
         this.direction = "right";
     } else {
         this.sprite = 'images/enemy-bug2.png';
         this.direction = "left";
     }
 };

 // Get a random number
 Enemy.prototype.getRandom = function() {
     return Math.floor((Math.random() + 0.3) * 30);
 };


 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
 Enemy.prototype.update = function(dt) {
     // Multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     if (this.x < 500 && this.direction == "right") {
         this.x += (this.speed) * dt;
         if (this.x > 500) {
             this.x = -300;
         }
     }
     if (this.x > -250 && this.direction == "left") {
         this.x -= (this.speed) * dt;
         if (this.x < -250) {
             this.x = 600;
         }
     }
     this.checkCollisions(player);

 };

 // Draw the enemy on the screen, required method for game
 Enemy.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
// Check collisions between player and enemy 
 Enemy.prototype.checkCollisions = function(player) {
     if (player.x < this.x + 75 &&
         player.x + 65 > this.x &&
         player.y < this.y + 50 &&
         70 + player.y > this.y) {
         player.sprite = 'images/char-pink-girl-ouch.png';
         if (player.lives <= 1) {
             player.lives = 0;
             alert("You lost all your lives...");
             player.lives = 3;
             player.goldCount = 0;

         } else {
             player.lives -= 1;
         }
         document.getElementById("gold").innerHTML = "Gold: " + player.goldCount;
         document.getElementById("lives").innerHTML = "Lives: " + player.lives;

         setTimeout(player.reset(), 4000);
     }

 };


 // Player Class
 var Player = function(x, y) {
     this.x = x;
     this.y = y;
     this.lives = 3;
     this.goldCount = 0;
     this.sprite = 'images/char-pink-girl.png';
 };

 Player.prototype.update = function(dt) {
     // Multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     this.x * (dt);
     this.y * (dt);

     if (this.x < 40 || this.x > 400) {
         if (this.x < 40) {
             this.x = 0;
         } else {
             this.x = 400;
         }
     }
     if (this.y < -20 || this.y > 430) {
         if (this.y < -20) {
             this.reset();
         } else {
             this.y = 430;
         }
     }
     if (this.x <= 120) {
         if (this.y > 70 && this.y < 170) {
             this.reset();

         }
     };
     if (this.x >= 280) {
         if (this.y > 70 && this.y < 170) {
             this.reset();
         }
     };
 };

 // Draw the enemy on the screen, required method for game
 Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
 Player.prototype.handleInput = function(key) {
    //  if this.goldCount > 3{
    //     if (key === 'left') {
    //      this.x -= 20; }
    //     else if (key === 'right') {
    //      this.x += 20;} 
    //     else if (key === 'up') {
    //      this.y -= 20;}
    //     else {
    //      this.y += 20;
    //     };
    // };
    //  else {
    //     if (key === 'left') {
    //      this.x -= 40; }
    //     else if (key === 'right') {
    //      this.x += 40;} 
    //     else if (key === 'up') {
    //      this.y -= 40;}
    //     else {
    //      this.y += 40;
    //     };
    // };
     
     if (key === 'left') {
         this.x -= 20;
     } else if (key === 'right') {
         this.x += 20;
     } else if (key === 'up') {
         this.y -= 20;
     } else {
         this.y += 20;
     };
 };

 // Reset player to original position
 Player.prototype.reset = function() {
     this.x = 200;
     this.y = 430;
     //this.sprite = 'images/char-pink-girl.png';
 }


// Gold Class and its functions
 var Gold = function(x, y) {
     this.x = x;
     this.y = y;
     this.sprite = 'images/Gold2.png';
 };

 Gold.prototype.update = function(dt) {
     this.x * (dt);
     this.y * (dt);
     this.checkCollisions(player);
 };

 Gold.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Gold.prototype.checkCollisions = function(player) {
     if (player.x < this.x + 75 &&
         player.x + 65 > this.x &&
         player.y < this.y + 50 &&
         70 + player.y > this.y && this.sprite == 'images/Gold2.png') {
         player.goldCount += 1;
         document.getElementById("gold").innerHTML = "Gold: " + player.goldCount;
         this.sprite = 'images/Rock2.png';
         player.reset();

         if (player.goldCount == 5) {
             setTimeout(alert("You collected all the gold, good job!"),6000);
             player.goldCount = 0;
         }
     }

 };
 Gold.prototype.reset = function() {
     this.sprite = 'images/Gold2.png';
 };


 // Now instantiate 
 // Place all enemy objects in an array called allEnemies
 // Place the player object in a variable called player

 // for (var i=0; i<4; i++) {
 //     allEnemies.push(new Enemy((-200+i*30),(60+i*80),this.speed));
 // };
 var enemy1 = new Enemy(-200, 60, this.speed);
 var enemy2 = new Enemy(-170, 230, this.speed);
 var enemy3 = new Enemy(-140, 310, this.speed);
 var enemy4 = new Enemy(250, -20, this.speed);
 var allEnemies = [enemy1, enemy2, enemy3, enemy4];

 var player = new Player(200, 380);

 var allGold = [];
 for (var i = 0; i < 5; i++) {
     allGold.push(new Gold(100 * i + 15, 15));
 };


 // This listens for key presses and sends the keys to your
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