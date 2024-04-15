/**
 * Class representing a clouds object.
 */
class Clouds extends MoveableObject {
    /**
     * Initial y-coordinate of the clouds object.
     */
    y = 0;

    /**
     * Height of the clouds object.
     */
    height = 400;

    /**
     * Constructs a new Clouds instance.
     * @param {number} x - The initial x-coordinate of the clouds.
     */
    constructor(x) {
        // Calls the superclass constructor and loads the initial image.
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        // Sets the initial x-coordinate of the clouds.
        this.x = x;
        // Sets the width of the clouds.
        this.width = 720;
        // Starts the clouds animation.
        this.animate();
    }

    /**
     * Animates the clouds.
     */
    animate() {
        // Moves the clouds left continuously.
        let interval = setInterval(() => {
            this.moveLeft();
        }, 20);
        // Pushes interval ID to the global array.
        intervalIds.push(interval);
    }
}