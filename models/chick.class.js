class Chick extends MoveableObject {
    height = 60;
    width = 40;
    y = 360;
    isJumpedOn = false;
    offset = {
        top: 80,
        left: 40,
        right: 40,
        bottom: 40,
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    audio = {
        jumped_on_sound : new Audio('audio/chick.mp3')
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 800;
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