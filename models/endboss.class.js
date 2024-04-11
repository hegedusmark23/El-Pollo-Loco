
class Endboss extends MoveableObject {
    height = 380;
    width = 200;
    y = 85;
    energy = 100;
    hadFirstContact = false;
    speed = 10;
    isBossDead = false;
    lastHit = 0;
    audio = {
        jumped_on_sound: new Audio('audio/chicken.mp3')
    }
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3200;
        this.animate();
    }

    animate() {
        let i = 0;
        let interval = setInterval(() => {
            this.checkIfBossfight();
            this.checkIfDead();
            if (!this.isBossDead) {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (world.character.x > 2720 && !this.hadFirstContact) {
                    this.hadFirstContact = true;
                    i = 0; // Reset i when the boss has the first contact
                } else if (this.isHurt()){
                    this.playAnimation(this.IMAGES_HURT);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                i++;
            } else {
                clearInterval(interval); // Clear the interval when the boss is dead
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 100);
        intervalIds.push(interval);
    }

    checkIfBossfight() {
        if (this.hadFirstContact) {
            this.moveLeft();
        }
    }

    checkIfDead() {
        if (this.energy <= 0) {
            this.isBossDead = true;
        }
    }
}