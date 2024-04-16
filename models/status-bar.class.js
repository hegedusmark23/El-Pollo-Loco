
class StatusBar extends DrawableObject {
    /**
     * Array containing paths to images representing different health percentages.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    /**
     * Constructs a new StatusBar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 10;
        this.y = -10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

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