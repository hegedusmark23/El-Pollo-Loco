
class Chicken extends MoveableObject {
    height = 80;
    width = 60;
    y = 360;
    isJumpedOn = false;
    energy = 20;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    audio = {
        jumped_on_sound: new Audio('audio/chicken.mp3')
    }

    /**
      * Constructs a new Chicken instance.
      */
    constructor() {
        // Calls the superclass constructor and loads the initial image.
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        // Converts audio object to array.
        this.AudioToArray(this.audio);
        // Loads images for chicken animations.
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        // Sets the initial x-coordinate of the chicken randomly.
        this.x = 1100 + Math.random() * 2000;
        // Starts the chicken animation.
        this.animate();
        // Sets a random speed for the chicken.
        this.speed = 0.15 + Math.random() * 0.25;
        // Checks if the chicken is dead.
        this.isDead();
    }

    /**
     * Animates the chicken.
     */
    animate() {
        // Moves the chicken left if not jumped on.
        let interval = setInterval(() => {
            if (this.isJumpedOn == false) {
                this.moveLeft()
            } else {
                this.doNotMove();
            }
        }, 1000 / 60);

        // Plays walking or dead animation based on chicken's state.
        let interval2 = setInterval(() => {
            if (this.isJumpedOn == false) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 1000 / 8);
        // Pushes interval IDs to the global array.
        intervalIds.push(interval, interval2);
    }

}
