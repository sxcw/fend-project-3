 "use strict";

 // Enemy constructor
 var Enemy = function(x, y, speed) {
     this.x = x;
     this.y = y;
     this.speed = this.getRandom();
     // The image/sprite for our enemies
     // Randomly decides if the bug goes left to right or right to left
     if (this.speed % 2 === 0) {
         this.sprite = 'images/enemy-bug.png';
         this.direction = "right";
     }
     else {
         this.sprite = 'images/enemy-bug2.png';
         this.direction = "left";
     }
 };

 // Get a random number
 Enemy.prototype.getRandom = function() {
     return Math.floor((Math.random() + 0.3) * 300);
 };

 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
 Enemy.prototype.update = function(dt) {
     // Multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     if (this.x < 500 && this.direction === "right") {
         this.x += (this.speed) * dt;
         if (this.x > 500) {
             this.x = -300;
         }
     }
     if (this.x > -250 && this.direction === "left") {
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
        // If the player collides with a bug, she becomes the "ouch" girl and loses a life 
         player.sprite = 'images/char-pink-girl-ouch.png';
         player.lives -= 1;
         // If the player loses all her lives, show a delayed alert and do the followings:
         if (player.lives < 1) {
             player.lives = 0;             
            function slowAlert(){
                alert("You lost all your lives...");
                // Reset sprite and lives and gold
                player.sprite = 'images/char-pink-girl.png';
                player.lives = 2;
                document.getElementById("lives").innerHTML = "Lives: " + player.lives;
                Gold.prototype.reset();
            }
             window.setTimeout(slowAlert,1000);
         }         
         // Update lives and gold number, reset player position
         document.getElementById("gold").innerHTML = "Gold: " + player.goldCount;
         document.getElementById("lives").innerHTML = "Lives: " + player.lives;
         player.reset();
     }
 };


 // Player consctructor 
 var Player = function(x, y) {
     this.x = x;
     this.y = y;
     this.lives = 2;
     this.goldCount = 0;
     this.sprite = 'images/char-pink-girl.png';
 };

 // Update the player's position, required method for game
 // Set player's boundary 
 Player.prototype.update = function() {
     if (this.x < 40 || this.x > 400) {
         if (this.x < 40) {
             this.x = 0;
         } else {
             this.x = 400;
         }
     }
     if (this.y < -10 || this.y > 435) {
         if (this.y < -10) {
             this.reset();
         } else {
             this.y = 435;
         }
     }
     if (this.x <= 120) {
         if (this.y > 70 && this.y < 170) {
             this.reset();
         }
     }
     if (this.x >= 280) {
         if (this.y > 70 && this.y < 170) {
             this.reset();
         }
     }
 };

 // Draw the enemy on the screen, required method for game
 Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
 // Handle user input: if user presses down the left arrow key, the player will move 40px to the left
 Player.prototype.handleInput = function(key) {
     if (key === 'left') {
         this.x -= 40;
     } else if (key === 'right') {
         this.x += 40;
     } else if (key === 'up') {
         this.y -= 40;
     } else {
         this.y += 40;
     }
 };

 // Reset player to original position
 Player.prototype.reset = function() {
     this.x = 200;
     this.y = 430;
 };

// Gold conscructor
 var Gold = function(x, y) {
     this.x = x;
     this.y = y;
     this.sprite = 'images/Gold2.png';
 };

// Update the gold's position, required method for game
 Gold.prototype.update = function() {
     this.checkCollisions(player);
 };

 // Draw the enemy on the screen, required method for game
 Gold.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

// If player collides with gold objects, do the followings: 
 Gold.prototype.checkCollisions = function(player) {
     if (player.x < this.x + 55 &&
         player.x + 45 > this.x &&
         player.y < this.y + 30 &&
         50 + player.y > this.y && this.sprite === 'images/Gold2.png') {
        // Add 1 to goldCount and display the updated number
        // Gold will turn to rock after touch, and rock is no longer collectable
         player.goldCount += 1;
         document.getElementById("gold").innerHTML = "Gold: " + player.goldCount;
         this.sprite = 'images/Rock2.png';
         // If player collects all the gold objects, show a delayed alert and do the followings:
         if (player.goldCount === 5) {
            function slowAlert(){
                alert("You collected all the gold, good job!");
                // Make sure the player sprite resets to the neutral face
                player.sprite = 'images/char-pink-girl.png';
                // Make sure player has 2 lives and display the number
                player.lives = 2;
                document.getElementById("lives").innerHTML = "Lives: " + player.lives;
                // Reset gold
                Gold.prototype.reset();
            }
            window.setTimeout(slowAlert,1000);
         }
         // Reset player position after she collides with gold
         player.reset();
     }
 };

 // Reset goldCount back to 0 and display the number, reinit gold
  Gold.prototype.reset = function() {
    player.goldCount = 0;
    document.getElementById("gold").innerHTML = "Gold: " + player.goldCount;
    // Reinit the gold objects
    allGold = [];
    for (var i = 0; i < 5; i++) {
        allGold.push(new Gold(100 * i + 15, 15));
    }
 };

 // Now instantiate 
 // Place all enemy objects in an array called allEnemies
 // Place the player object in a variable called player
 // Place all gold objects in an array called allGold
 var enemy1 = new Enemy(-200, 60, this.speed);
 var enemy2 = new Enemy(-170, 230, this.speed);
 var enemy3 = new Enemy(-140, 310, this.speed);
 var enemy4 = new Enemy(250, -20, this.speed);
 var allEnemies = [enemy1, enemy2, enemy3, enemy4];

 var player = new Player(200, 430);

 var allGold = [];
 for (var i = 0; i < 5; i++) {
     allGold.push(new Gold(100 * i + 15, 15));
 }

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