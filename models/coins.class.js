class Coins extends MoveableObject {
    height = 120;
    width = 120;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 6);
    }
}