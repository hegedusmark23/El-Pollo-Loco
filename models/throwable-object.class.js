
class ThrowableObject extends MoveableObject {
    audio = {
        throw_sound: new Audio('audio/throw.mp3'),
        bottle_shatter_sound: new Audio('audio/bottle-shatter.mp3')
    }
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    splash = false;
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

    constructor(x, y, check_if_threw, throw_direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_THROW)
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.check_if_threw = check_if_threw;
        this.throw_direction = throw_direction;
        this.checkIfThrew();
        this.throw();
        this.animate();
        
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            if (this.throw_direction == 'right') {
                this.x += 5;
            } else if (this.throw_direction == 'left') {
                this.x -= 5;
            }
        }, 25);
    }

    checkIfThrew() {
        if (this.check_if_threw == true) {
            this.splash = true;
        }
    }



    animate() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.isOnGround() && this.splash == true || world.isCollidingWithBoss) {
                //clearInterval(interval); // Clear the interval first
                this.playAnimation(this.IMAGES_SPLASH);
                this.playAudio('bottle_shatter_sound',0.2);
                this.splash = false;
                world.isCollidingWithBoss = false;
                setTimeout(() => {
                    world.throwableObjects.splice(0, 1);
                }, 100);
            }
        }, 1000 / 15);
        intervalIds.push(interval);
    }
}