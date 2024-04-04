class Coins extends MoveableObject {
    height = 120;
    width = 120;
    offset = {
        top: 30,
        left: 40,
        right: 70,
        bottom: 60,
    }
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    audio = {
        collect_coin_sound : new Audio('audio/coin.mp3')
    }

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.AudioToArray(this.audio);
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