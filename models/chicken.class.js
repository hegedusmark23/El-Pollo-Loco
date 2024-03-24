
class Chicken extends MoveableObject {
    height = 80;
    width = 60;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700 + Math.random() * 2000;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft()
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);

    }
}