
class World {

    character = new Character();
    bottle = new ThrowableObject();
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
        setInterval(() => {
            this.checkCollisions();
            this.killByBottle();
            this.killByJump();
            
        }, 600);
        setInterval(() => {
          this.checkThrowObjects();
          this.collectCoins();  
          this.collectBottles();
        },100);
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
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
                this.bottle.audio['throw_sound'].volume = 0.2;
                this.bottle.audio['throw_sound'].play();
                this.collectedBottles--;
                this.statusBarFlasks.setPercentage(this.collectedBottles)
                this.throwableObjects.push(bottle)
            }
        }
    }

    killByJump(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpedOn(enemy)) {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                enemy.audio['jumped_on_sound'].volume = 0.2;
                enemy.audio['jumped_on_sound'].play();
                //this.character.speedY = 10;
            }
        });
    }

    killByBottle(){
        this.level.enemies.forEach((enemy) => {
            if (this.bottle.isColliding(enemy)) {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }
        });
    }


    collectBottles(){
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 5) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.collectedBottles++;
                    bottle.audio['item_pickup_sound'].play();
                    this.statusBarFlasks.setPercentage(this.collectedBottles)
                }
            }
        });
    }

    collectCoins(){
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.collectedCoins++;
                this.statusBarCoins.setPercentage(this.collectedCoins)
                coin.audio['collect_coin_sound'].play();
            }
        });
    }


    stopGame(){
        for (let i = 0; i < intervalIds.length; i++) {
            const id = intervalIds[i];
            this.clearInterval(id)
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarFlasks);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0);

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