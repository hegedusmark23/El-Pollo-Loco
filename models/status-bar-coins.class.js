class StatusBarCoins extends DrawableObject {
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    constructor(){
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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