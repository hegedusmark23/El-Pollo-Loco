
/**
 * Class representing the status bar for flasks in the game.
 */
class StatusBarFlasks extends DrawableObject {
    /**
     * Array containing the paths to images representing different percentage levels of flasks.
     */
    IMAGES_FLASKS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates a StatusBarFlasks instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_FLASKS);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage level of flasks and updates the image accordingly.
     * @param {number} percentage - The percentage level of flasks.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_FLASKS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage level.
     * @returns {number} - The index of the image in the IMAGES_FLASKS array.
     */
    resolveImageIndex(){
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
}