/**
 * Class representing a movable object in the game.
 */
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
       * Applies gravity to the movable object.
       */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }
        }, 1000 / 40);
    }

    /**
     * Makes the object fall down after a certain delay.
     */
    fallDown() {
        setTimeout(() => {
            setInterval(() => {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }, 1000 / 25);
        }, 1000);
    }

    /**
     * Inflicts damage to the movable object.
     * @param {number} dmg - The amount of damage to inflict.
     */
    hit(dmg) {
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the movable object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the movable object is currently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500; // Convert milliseconds to seconds
        return timepassed < 0.5;
    }

    /**
     * Checks if the movable object is colliding with another object.
     * @param {MoveableObject} mo - The other moveable object to check collision with.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if the movable object is above ground level.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Throwable object should always fall
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the movable object is on the ground.
     */
    isOnGround() {
        return this.y >= 350;
    }

    /**
     * Plays animation for the movable object.
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays audio for the movable object.
     * @param {string} audio - The audio key to play.
     * @param {number} volume - The volume level for the audio.
     */
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