/**
 * Class representing the status bar for coins in the game.
 */
class StatusBarCoins extends DrawableObject {
    /**
     * Array containing the paths to images representing different percentage levels of coins.
     */
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates a StatusBarCoins instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage level of coins and updates the image accordingly.
     * @param {number} percentage - The percentage level of coins.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage level.
     * @returns {number} - The index of the image in the IMAGES_COINS array.
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