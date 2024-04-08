
class World {
    bottle = new ThrowableObject();
    character = new Character();
    endboss = new Endboss();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarFlasks = new StatusBarFlasks();
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    winOverlay = new Overlay('img/9_intro_outro_screens/game_over/game over!.png', 0, 0);
    didWin = false;
    loseOverlay = new Overlay('img/9_intro_outro_screens/game_over/you lost.png', 0, 0);
    didLose = false;
    check_if_threw = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Checks if objects collide with eachother.
     */
    run() {
        let interval = setInterval(() => {
            this.checkCollisions();
            this.killByJump();
            this.killByBottle();
        }, 600);
        let interval2 = setInterval(() => {
            this.checkThrowObjects();
            this.collectCoins();
            this.collectBottles();
            this.checkIfWinOrLose();
        }, 100);
        intervalIds.push(interval, interval2)
    }


    addOverlay() {
        if (this.didLose) {
            this.stopGame();
            this.addToMap(this.loseOverlay);
            revealObject('restart-button');
        } else if (this.didWin) {
            this.stopGame();
            this.addToMap(this.winOverlay);
            revealObject('restart-button');
        }
    }


    checkIfWinOrLose() {
        if (this.character.energy == 0) {
            this.didLose = true;
        } else if (this.endboss.energy == 0) {
            this.didWin = true;
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.collectedBottles >= 1) {
                this.check_if_threw = true;
                let throw_direction = this.character.otherDirection ? 'left' : 'right';
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.check_if_threw, throw_direction);
                this.playAudio(bottle,'throw_sound', 0.2)
                this.collectedBottles--;
                this.statusBarFlasks.setPercentage(this.collectedBottles)
                this.throwableObjects.push(bottle)
            }
        }
    }


    killByJump() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpedOn(enemy)) {
                enemy.isJumpedOn = true;
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                }, 500);
                this.playAudio(enemy,'jumped_on_sound', 0.2)
                /*if (this.character.y > 70) {
                    this.character.speedY = 10;
                }*/
            }
        });
    }


    killByBottle() {
        this.throwableObjects.forEach((bottle, indexBottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottleCollidingEnemy(enemy, indexBottle)) {
                    enemy.isJumpedOn = true;
                    enemy.energy -= 20;
                    if (this instanceof Chick ||  this instanceof Chicken) {
                        setTimeout(() => {
                            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                        }, 500);
                    }
                    this.playAudio(enemy,'jumped_on_sound', 0.2)
                }
            });
        });
    }

    bottleCollidingEnemy(enemy, indexBottle) {
        return this.throwableObjects[indexBottle].isColliding(enemy);
    }

    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 5) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.collectedBottles++;
                    this.playAudio(bottle,'item_pickup_sound', 1)
                    this.statusBarFlasks.setPercentage(this.collectedBottles)
                }
            }
        });
    }


    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.collectedCoins++;
                this.statusBarCoins.setPercentage(this.collectedCoins)
                this.playAudio(coin,'collect_coin_sound', 1)
            }
        });
    }

    playAudio(obj, audio, volume) {
        obj.audio[audio].volume = volume;
        obj.audio[audio].play();
    }


    stopGame() {
        for (let i = 0; i < intervalIds.length; i++) {
            const id = intervalIds[i];
            clearInterval(id)
        }
    }


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
        this.addOverlay();
        this.ctx.translate(this.camera_x, 0);
        // Dynamic objects.
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        // Draw gonna be constantly called.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;

    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    setWorld() {
        this.character.world = this;
    }
}