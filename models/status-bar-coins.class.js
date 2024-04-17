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
}