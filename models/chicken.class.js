
class Chicken extends MoveableObject {
    height = 80;
    width = 60;
    y = 360;
    isJumpedOn = false;
    energy = 20;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    audio = {
        jumped_on_sound: new Audio('audio/chicken.mp3')
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 1100 + Math.random() * 2000;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
        this.isDead();
    }

    animate() {
        let interval = setInterval(() => {
            if (this.isJumpedOn == false) {
                this.moveLeft()
            } else {
                this.doNotMove();
            }
        }, 1000 / 60);

        let interval2 = setInterval(() => {
            if (this.isJumpedOn == false) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 1000 / 8);
        intervalIds.push(interval, interval2);
    }

}
