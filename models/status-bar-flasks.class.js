
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
}