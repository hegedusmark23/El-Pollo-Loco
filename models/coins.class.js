class Coins extends MoveableObject {
    height = 120;
    width = 120;
    offset = {
        top: 20,
        left: 20,
        right: 40,
        bottom: 40,
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
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 6);
        intervalIds.push(interval);
    }
}