/**
 * Class representing the game world.
 */
class World {

    bottle = new ThrowableObject();
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarFlasks = new StatusBarFlasks();
    statusBarEndboss = new StatusBarEndboss();
    winOverlay = new Overlay('img/9_intro_outro_screens/game_over/game over!.png', 0, 0);
    didWin = false;
    loseOverlay = new Overlay('img/9_intro_outro_screens/game_over/you lost.png', 0, 0);
    didLose = false;
    check_if_threw = false;
    isAtBoss = false;
    isCollidingWithBoss = false;
    loopAudio = true;
    muted = false;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];

    /**
     * Constructs a new World object.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input manager.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.endboss = new Endboss();
    }

    /**
     * Runs the game loop.
     */
    run() {
        let interval = setInterval(() => {
            this.killByJump();
            this.killByBottle();
        }, 1000 / 60);
        let interval2 = setInterval(() => {
            this.checkCollisions();
            this.hitByBottle();
        }, 400);
        let interval3 = setInterval(() => {
            this.checkThrowObjects();
            this.collectCoins();
            this.collectBottles();
            this.checkIfWinOrLose();
            this.returnCharacterPosition();
        }, 100);
        intervalIds.push(interval, interval2, interval3);
    }


    /**
  * Adds the appropriate overlay based on game outcome and handles related actions.
  */
    addOverlay() {
        if (this.didLose) {
            setTimeout(() => {
                this.stopGame();
            }, 2000);
            this.addToMap(this.loseOverlay);
            this.playAudio(this.winOverlay, 'lose_sound', 0.3);
            this.pauseAudio();
            revealObject('restart-button');
        } else if (this.didWin) {
            setTimeout(() => {
                this.stopGame();
            }, 2000);
            this.addToMap(this.winOverlay);
            this.playAudio(this.winOverlay, 'win_sound', 0.3);
            this.pauseAudio();
            revealObject('restart-button');
        }
    }

    /**
     * Checks if the player has won or lost the game.
     */
    checkIfWinOrLose() {
        if (this.character.energy == 0) {
            this.didLose = true;
        } else if (this.level.endboss.energy == 0) {
            this.didWin = true;
        }
    }

    /**
     * Checks collisions between the character and enemies or the endboss.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isJumpedOn) {
                this.character.hit(20);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.level.endboss) && !this.level.enemies.isJumpedOn) {
            this.character.hit(40);
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the player throws objects using keyboard input.
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.collectedBottles >= 1) {
                this.check_if_threw = true;
                let throw_direction = this.character.otherDirection ? 'left' : 'right';
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.check_if_threw, throw_direction);
                if (!this.muted) {
                    this.playAudio(bottle, 'throw_sound', 0.2);
                }
                this.collectedBottles--;
                this.statusBarFlasks.setPercentage(this.collectedBottles);
                this.throwableObjects.push(bottle);
            }
        }
    }

    /**
     * Handles enemy elimination when the character jumps on them.
     */
    killByJump() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.isJumpedOn = true;
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                }, 300);
                this.playAudio(enemy, 'jumped_on_sound', 0.2);
                this.jumpAfterKill();
            }
        });
    }

    /**
     * Initiates character jump after eliminating an enemy.
     */
    jumpAfterKill() {
        if (this.character.y > 70) {
            this.character.speedY = 10;
            this.playAudio(this.character, 'bouncing_sound', 0.2);
        }
    }

    /**
     * Handles enemy elimination by thrown bottles.
     */
    killByBottle() {
        this.throwableObjects.forEach((bottle, indexBottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottleCollidingEnemy(enemy, indexBottle)) {
                    enemy.isJumpedOn = true;
                    setTimeout(() => {
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }, 500);
                    this.playAudio(enemy, 'jumped_on_sound', 0.2);
                }
            });
        });
    }

    /**
     * Handles boss hit by thrown bottles.
     */
    hitByBottle() {
        this.throwableObjects.forEach((bottle, indexBottle) => {
            if (this.bottleCollidingEnemy(this.endboss, indexBottle)) {
                this.isCollidingWithBoss = true;
                this.level.endboss.hit(20);
                this.statusBarEndboss.setPercentage(this.level.endboss.energy);
                this.playAudio(this.endboss, 'jumped_on_sound', 0.2);
            }
        });
    }

    /**
     * Checks if a bottle collides with an enemy.
     * @param {Enemy} enemy - The enemy object.
     * @param {number} indexBottle - The index of the throwable object array.
     * @returns {boolean} - Whether collision occurred.
     */
    bottleCollidingEnemy(enemy, indexBottle) {
        return this.throwableObjects[indexBottle].isColliding(enemy);
    }


    /**
 * Checks for collision between the character and bottles, allowing collection.
 */
    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 5) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.collectedBottles++;
                    this.playAudio(bottle, 'item_pickup_sound', 1);
                    this.statusBarFlasks.setPercentage(this.collectedBottles);
                }
            }
        });
    }

    /**
     * Checks for collision between the character and coins, allowing collection.
     */
    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.collectedCoins++;
                this.statusBarCoins.setPercentage(this.collectedCoins);
                this.playAudio(coin, 'collect_coin_sound', 1);
            }
        });
    }

    /**
     * Plays audio associated with the specified object and audio key.
     * @param {Object} obj - The object to play audio for.
     * @param {string} audio - The key for the audio to play.
     * @param {number} vol - The volume level for the audio.
     */
    playAudio(obj, audio, vol) {
        if (this.loopAudio) {
            obj.audio[audio].volume = vol;
            obj.audio[audio].play();
        } else {
            obj.audio[audio].pause();
        }
    }

    /**
     * Pauses audio playback after a delay.
     */
    pauseAudio() {
        setTimeout(() => {
            this.loopAudio = false;
        }, 3000);
    }

    /**
     * Stops the game by clearing all running intervals.
     */
    stopGame() {
        for (let i = 0; i < intervalIds.length; i++) {
            const id = intervalIds[i];
            clearInterval(id);
        }
        this.didLose = false;
        this.didWin = false;
        console.log(this.didLose,this.didWin)
    }

    /**
     * Sets the 'isAtBoss' flag based on the character's x-position.
     */
    returnCharacterPosition() {
        if (this.character.x > 2720) {
            this.isAtBoss = true;
        }
    }

    /**
     * Reveals the boss's health bar when the character reaches the boss area.
     */
    revealBossHealth() {
        if (this.isAtBoss == true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Draws the game elements on the canvas, including dynamic and static objects.
     */
    draw() {
        // Clear frame.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Dynamic objects.
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        // Static objects.
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarFlasks);
        this.addToMap(this.statusBarCoins);
        this.revealBossHealth();
        this.addOverlay();
        this.ctx.translate(this.camera_x, 0);
        // Dynamic objects.
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        // Draw will be constantly called.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the map for drawing.
     * @param {Array} objects - Array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the map for drawing.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for drawing if needed.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of the image after flipping.
     * @param {Object} mo - The object whose image is to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Sets the world property of the character object.
     */
    setWorld() {
        this.character.world = this;
    }
}