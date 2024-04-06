
class ThrowableObject extends MoveableObject {
    audio = {
        throw_sound: new Audio('audio/throw.mp3'),
        bottle_shatter_sound: new Audio('audio/bottle-shatter.mp3')
    }
    splash = false;
    throw_direction = false;
    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_THROW)
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
        this.animate();

    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.splash = true;
        setInterval(() => {
            if (world.character.otherDirection == false) {
                this.x += 8;
            } else if (this.throwDirection = true) {
                this.x -= 8;
            }
        }, 25);

    }

    throwDirection() {
        if (world.character.otherDirection == true) {
            throwDirection = true;
        } else if (this.throw()) {
            throwDirection = false;
        }
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.isOnGround() && this.splash == true) {
                this.playAnimation(this.IMAGES_SPLASH);
                //this.audio['bottle_shatter_sound'].play();
                this.splash = false;
            }
        }, 1000 / 20);


    }
}