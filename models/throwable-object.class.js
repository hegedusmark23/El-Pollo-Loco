/**
 * Class representing a throwable object in the game.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    /**
     * Audio objects for throw and bottle shatter sounds.
     * @type {Object}
     */
    audio = {
        throw_sound: new Audio('audio/throw.mp3'),
        bottle_shatter_sound: new Audio('audio/bottle-shatter.mp3')
    };

    /**
     * Flag indicating if the throwable object splashes.
     * @type {boolean}
     */
    splash = false;

    /**
     * Array of image paths representing the throwable object in throw animation.
     * @type {string[]}
     */
    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths representing the throwable object in splash animation.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {boolean} check_if_threw - Flag to check if the object was thrown.
     * @param {string} throw_direction - The direction in which the object is thrown.
     */
    constructor(x, y, check_if_threw, throw_direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.AudioToArray(this.audio);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
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

    /**
     * Throws the object and applies gravity.
     */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            if (this.throw_direction == 'right') {
                this.x += 10;
            } else if (this.throw_direction == 'left') {
                this.x -= 10;
            }
        }, 25);
    }

    /**
     * Checks if the throwable object was thrown.
     */
    checkIfThrew() {
        if (this.check_if_threw == true) {
            this.splash = true;
        }
    }

    checkIfMuted(){}

    /**
     * Animates the throwable object.
     */
    animate() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.isOnGround() && this.splash || world.isCollidingWithBoss) {
                clearInterval(interval);
                this.playAnimation(this.IMAGES_SPLASH);
                if (!world.muted) {
                    this.playAudio('bottle_shatter_sound', 0.2);
                }
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