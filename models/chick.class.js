/**
 * Class representing a chick object.
 */
class Chick extends MoveableObject {
    height = 60;
    width = 40;
    y = 360;
    isJumpedOn = false;
    energy = 20;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    audio = {
        jumped_on_sound: new Audio('audio/chick.mp3')
    }

    /**
     * Constructs a new Chick instance.
     */
    constructor() {
        // Calls the superclass constructor and loads the initial image.
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        // Converts audio object to array.
        this.AudioToArray(this.audio);
        // Loads images for chick animations.
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        // Sets the initial x-coordinate of the chick randomly.
        this.x = 500 + Math.random() * 800;
        // Starts the chick animation.
        this.animate();
        // Sets a random speed for the chick.
        this.speed = 0.15 + Math.random() * 0.25;
        // Checks if the chick is dead.
        this.isDead();
    }

    /**
     * Animates the chick.
     */
    animate() {
        let interval = setInterval(() => {
            this.moveChick();
        }, 1000 / 60);
        let interval2 = setInterval(() => {
            this.animateChick()
        }, 1000 / 8);
        intervalIds.push(interval, interval2);
    }

    moveChick(){
        if (this.isJumpedOn == false) {
            this.moveLeft()
        } else {
            this.doNotMove();
        }
    }

    animateChick(){
        if (this.isJumpedOn == false) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGE_DEAD);
        }
    }
}