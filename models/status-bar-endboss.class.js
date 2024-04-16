/**
 * Class representing the status bar for end boss in the game.
 */
class StatusBarEndboss extends DrawableObject {
    /**
         * Array containing paths to images representing different health percentages.
         * @type {string[]}
         */
    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    /**
     * Constructs a new StatusBar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.x = 420;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The health percentage to set.
     
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }*/

    /**
     * Resolves the index of the image array based on the current health percentage.
     * @returns {number} The index of the image array.
     */
    resolveImageIndex() {
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
}