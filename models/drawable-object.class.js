
/**
 * Class representing a drawable object.
 */
class DrawableObject {
    /**
     * Initial x-coordinate of the drawable object.
     */
    x = 100;

    /**
     * Initial y-coordinate of the drawable object.
     */
    y = 100;

    /**
     * Height of the drawable object.
     */
    height = 200;

    /**
     * Width of the drawable object.
     */
    width = 100;

    /**
     * Image element for the drawable object.
     */
    img;

    /**
     * Cache for loaded images.
     */
    imageCache = {};

    /**
     * Index of the current image in animation.
     */
    currentImage = 0;

    /**
     * Loads the starting image of the animation.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads the images from the given array.
     * @param {Array} arr - Array containing paths to images.
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
     * Sets the percentage level of coins and updates the image accordingly.
     * @param {number} percentage - The percentage level of coins.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.handleInstance();
        this.img = this.imageCache[path];
    }

    handleInstance(){
        if (this instanceof StatusBarCoins) {
            return this.IMAGES_COINS[this.resolveImageIndex()];
        } else if (this instanceof StatusBarFlasks) {
            return this.IMAGES_FLASKS[this.resolveImageIndex()];
        } else if (this instanceof StatusBarEndboss) {
            return this.IMAGES_HEALTH_ENDBOSS[this.resolveImageIndex()];
        } else {
            return this.IMAGES_HEALTH[this.resolveImageIndex()];
        }
    }

    resolveImageIndex() {
        if (this instanceof StatusBarCoins || this instanceof StatusBarFlasks) {
            this.percentageInvers();
        } else if (this instanceof StatusBarEndboss || this instanceof StatusBar) {
            this.percentage();
        }
    }

    percentage(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }

    percentageInvers(){
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 1) {
            return 1;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 4) {
            return 4;
        } else {
            return 5;
        }
    }

    /**
     * Converts audio objects to an array and adds them to the global soundEffects array.
     * @param {Object} arr - Object containing audio elements.
     */
    AudioToArray(arr) {
        Object.values(arr).forEach(sound => {
            soundEffects.push(sound);
        });
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the frame of the drawable object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof ThrowableObject || this instanceof Chicken || this instanceof Coins || this instanceof Endboss || this instanceof Bottles || this instanceof Chick ) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom)
            ctx.stroke();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke();
        }
    }
}