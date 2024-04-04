
class Chicken extends MoveableObject {
    height = 80;
    width = 60;
    y = 360;
    isJumpedOn = false;
    offset = {
        top: 40,
        left: 0,
        right: 0,
        bottom: 10,
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
        jumped_on_sound : new Audio('audio/chicken.mp3')
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1100 + Math.random() * 2000;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
        this.isDead();
    }

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);

    }

    isDead(){
        if (this.isJumpedOn == true) {
            this.jumped_on_sound.play();
            this.playAnimation(this.IMAGE_DEAD);
            
        }
    }
}
