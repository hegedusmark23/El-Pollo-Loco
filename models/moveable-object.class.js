class MoveableObject {
    x = 100;
    y = 100;
    img;
    height = 200;
    width = 100;
    speed = 0.25;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    acceletation = 1;
    energy = 100;

    /**
     * Applies Gravity when the character over the given coordinate is.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }
        }, 1000 / 25);
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
    /**
     * Defines if the character above Ground is.
     */
    isAboveGround() {
        return this.y < 180;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke();
        }
    }

    /**
     * Loads the starting image of the animation.
     * @param {Array} path 
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img src="" id="img">
        this.img.src = path
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    /**
     * 
     * @param {Path} images 
     */
    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 15;
    }
}