/**
 * Class representing a character object.
 */
class Character extends MoveableObject {
    height = 250;
    width = 130;
    y = 180;
    x = 100;
    speed = 5;
    energy = 100;
    world;
    offset = {
        top: 20,
        left: 15,
        right: 40,
        bottom: 10
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]
    
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',

    ]

    audio = {
        walking_sound: new Audio('audio/running.mp3'),
        jumping_sound: new Audio('audio/jump.mp3'),
        hurt_sound: new Audio('audio/hurt.mp3'),
        bouncing_sound: new Audio('audio/boing.mp3')
    }


    /**
     * Constructs a new Character instance.
     */
    constructor() {
        // Calls the superclass constructor and loads the initial image.
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        // Converts audio object to array.
        this.AudioToArray(this.audio);
        // Loads images for various animations.
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        // Applies gravity to the character.
        this.applyGravity();
        // Starts the character animation.
        this.animate();
    }

    /**
     * Animates the character.
     */
    animate() {
        // Animates character movement.
        let interval = setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);
        // Animates character state changes.
        let interval2 = setInterval(() => {
            this.playAnimations();
        }, 1000 / 10);
        // Pushes interval IDs to the global array.
        intervalIds.push(interval, interval2);
    }
    
    /**
     * Pauses walking sound if character stops moving.
     * Moves character right if right arrow key is pressed and not at level end.
     * Moves character left if left arrow key is pressed and not at edge of canvas.
     * Makes character jump if space key is pressed and not already jumping.
     * Adjusts camera position based on character's position.
     */
    moveCharacter(){
        this.audio['walking_sound'].pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playAudio('walking_sound',1);
        } if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playAudio('walking_sound',1);
        } if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.audio['walking_sound'].pause();
            this.jump();
            this.playAudio('jumping_sound',0.5);
        }
        this.world.camera_x = -this.x + 100;
    }
/**
 * Plays dead animation if character is dead.
 * Plays hurt animation if character is hurt.
 * Plays jumping animation if character is in air.
 * Plays idle animation if character is idle.
 * Plays long idle animation if character is long idle.
 * Plays walking animation if character is moving.
 */
    playAnimations(){
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD)
            this.fallDown();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
            this.playAudio('hurt_sound',0.5);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.idle) {
            this.playAnimationOnce(this.IMAGES_IDLE);
        } else if (this.world.keyboard.long_idle) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }
}


