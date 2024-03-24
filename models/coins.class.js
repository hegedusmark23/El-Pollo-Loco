class Coins extends MoveableObject {
    height = 120;
    width = 120;
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }
}