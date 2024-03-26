class MoveableObject extends DrawableObject {
    
    speed = 0.25;
    otherDirection = false;
    speedY = 0;
    acceletation = 1;
    energy = 100;
    lastHit = 0;

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
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in miliseconds.
        timepassed = timepassed / 1000; //Difference in seconds.
        return timepassed < 0.5; 
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


    /**
     * 
     * @param {Path} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;
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