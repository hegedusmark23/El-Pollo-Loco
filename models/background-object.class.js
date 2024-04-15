/**
 * Class representing a background object.
 */
class BackgroundObject extends MoveableObject {
    height = 400;
    width = 720;

     /**
     * Constructs a new BackgroundObject instance.
     * @param {string} imagePath - Path to the image of the background object.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} y - The y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
    }
}