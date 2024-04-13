
class World {
    bottle = new ThrowableObject();
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarFlasks = new StatusBarFlasks();
    statusBarEndboss = new StatusBarEndboss();
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    winOverlay = new Overlay('img/9_intro_outro_screens/game_over/game over!.png', 0, 0);
    didWin = false;
    loseOverlay = new Overlay('img/9_intro_outro_screens/game_over/you lost.png', 0, 0);
    didLose = false;
    check_if_threw = false;
    isAtBoss = false;
    isCollidingWithBoss = false;
    loopAudio = true;
    

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
            this.returnCharacterPosition();
        }, 100);
        intervalIds.push(interval, interval2)
    }


    addOverlay() {
        if (this.didLose) {
            setTimeout(() => {
                this.stopGame();
            }, 500);
            this.addToMap(this.loseOverlay);
            this.playAudio(this.winOverlay, 'lose_sound', 0.7)
            this.pauseAudio()
        } else if (this.didWin) {
            setTimeout(() => {
                this.stopGame();
            }, 1000);
            this.addToMap(this.winOverlay);
            this.playAudio(this.winOverlay, 'win_sound', 0.7)
            this.pauseAudio() 
        }
    }


    checkIfWinOrLose() {
        if (this.character.energy == 0) {
            this.didLose = true;
        } this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if (enemy.energy == 0) {
                    this.didWin = true;
                }
            }
        });
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
             if (enemy instanceof Chick || enemy instanceof Chicken) {
                   this.character.hit(20);
             } else {
                this.character.hit(60);
             } 
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
                this.playAudio(bottle, 'throw_sound', 0.2)
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
                this.playAudio(enemy, 'jumped_on_sound', 0.2)
                if (this.character.y > 70) {
                    this.character.speedY = 10;
                }
            }
        });
    }


    killByBottle() {
        this.throwableObjects.forEach((bottle, indexBottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottleCollidingEnemy(enemy, indexBottle)) {
                    enemy.isJumpedOn = true;
                    if (enemy instanceof Chick || enemy instanceof Chicken) {
                        setTimeout(() => {   
                            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                        }, 500);
                    } else  {
                        this.isCollidingWithBoss = true;
                        enemy.hit(20); 
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    }
                    this.playAudio(enemy, 'jumped_on_sound', 0.2);
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
                    this.playAudio(bottle, 'item_pickup_sound', 1)
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
                this.playAudio(coin, 'collect_coin_sound', 1)
            }
        });
    }


    playAudio(obj, audio, vol) {
            if (this.loopAudio) {
                obj.audio[audio].volume = vol;
                obj.audio[audio].play();
            } else {
                obj.audio[audio].pause();
            }
    }


    pauseAudio(){
        setTimeout(() => {
            this.loopAudio = false;
        }, 3000);
    }

    stopGame() {
        for (let i = 0; i < intervalIds.length; i++) {
            const id = intervalIds[i];
            clearInterval(id)
        }
    }

    returnCharacterPosition() {
        if (this.character.x > 2720) {
            this.isAtBoss = true;
        }
    }

    revealBossHealth() {
        if (this.isAtBoss == true) {
            this.addToMap(this.statusBarEndboss);
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
        this.revealBossHealth();
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