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
}