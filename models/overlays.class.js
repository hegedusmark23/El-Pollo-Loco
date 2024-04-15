
/**
 * Class representing an overlay in the game.
 */
class Overlay extends DrawableObject {
    /**
     * Audio resources for the overlay.
     */
    audio = {
        win_sound: new Audio('audio/win.mp3'),
        lose_sound: new Audio('audio/lose.wav')
    };

    /**
     * Creates an overlay instance.
     * @param {string} path - The image path for the overlay.
     * @param {number} x - The x-coordinate of the overlay.
     * @param {number} y - The y-coordinate of the overlay.
     */
    constructor(path, x, y) {
        super().loadImage(path);
        this.AudioToArray(this.audio);
        this.x = x;
        this.y = y;
        this.width = 720;
        this.height = 480;
    }
}