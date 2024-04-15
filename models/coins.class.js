/**
 * Class representing a coins object.
 */
class Coins extends MoveableObject {
    /**
     * Height of the coins object.
     */
    height = 120;

    /**
     * Width of the coins object.
     */
    width = 120;

    /**
     * Offset values for collision detection.
     */
    offset = {
        top: 20,
        left: 20,
        right: 40,
        bottom: 40,
    };

    /**
     * Array containing paths to images of coins.
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Audio elements associated with the coins object.
     */
    audio = {
        collect_coin_sound: new Audio('audio/coin.mp3')
    };

    /**
     * Constructs a new Coins instance.
     * @param {number} x - The initial x-coordinate of the coins.
     * @param {number} y - The initial y-coordinate of the coins.
     */
    constructor(x, y) {
        // Calls the superclass constructor and loads the initial image.
        super().loadImage('img/8_coin/coin_1.png');
        // Converts audio object to array.
        this.AudioToArray(this.audio);
        // Loads images for coin animation.
        this.loadImages(this.IMAGES_COIN);
        // Starts the coin animation.
        this.animate();
        // Sets the initial coordinates of the coins.
        this.x = x;
        this.y = y;
    }

    /**
     * Animates the coins.
     */
    animate() {
        // Plays coin animation continuously.
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 6);
        // Pushes interval ID to the global array.
        intervalIds.push(interval);
    }
}