class MoveableObject extends DrawableObject {

    speed = 0.25;
    otherDirection = false;
    speedY = 0;
    acceletation = 1;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

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


    fallDown() {
        setTimeout(() => {
            setInterval(() => {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }, 1000 / 25);
        }, 1000);
    }

    hit(dmg) {
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in miliseconds.
        timepassed = timepassed / 500; //Difference in seconds.
        return timepassed < 0.5;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    isJumpedOn(mo) {
        // Adjust the threshold as needed
        const verticalThreshold = 30; // Pixels
        console.log('Character:', this.x, this.y, this.width, this.height);
        console.log('Enemy:', mo.x, mo.y, mo.width, mo.height);
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom <= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top - verticalThreshold <= mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Defines if the character above Ground is.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable object should always fall.
            return true;
        } else {
            return this.y < 180;
        }
    }

    isOnGround() {
        return this.y >= 350
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


    playAudio(audio, volume) {
        this.audio[audio].volume = volume;
        this.audio[audio].play();
    }


    moveRight() {
        this.x += this.speed;
    }

    doNotMove() {
        this.x += 0;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 16;
    }
}