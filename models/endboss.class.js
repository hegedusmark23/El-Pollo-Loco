/**
 * Class representing the end boss.
 */
class Endboss extends MoveableObject {
    height = 380;
    width = 200;
    y = 85;
    energy = 100;
    hadFirstContact = false;
    speed = 10;
    isBossDead = false;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
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

        /**
     * Constructs a new Endboss object.
     */
        constructor() {
            super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
            this.AudioToArray(this.audio);
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_ALERT);
            this.loadImages(this.IMAGES_ATTACK);
            this.loadImages(this.IMAGES_HURT);
            this.loadImages(this.IMAGES_DEAD);
            this.x = 3200;
            this.animate();
        }
    
        /**
         * Animates the end boss.
         */
        animate() {
            let interval = setInterval(() => {
                this.checkIfCharacterIsAtBoss();
                this.checkIfDead();
                if (this.isBossDead) {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.fallDown();
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.hadFirstContact) {
                    this.moveEndboss();
                } else if (world.character.x < 2720) {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }, 100);
            intervalIds.push(interval);
        }

        moveEndboss(){
            if (this.energy > 60) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            this.moveLeft();
        }
    
        /**
         * Checks if the character is at the boss.
         */
        checkIfCharacterIsAtBoss() {
            if (world.character.x > 2720) {
                this.hadFirstContact = true;
                this.speed += 0.4
            }
        }
    
        /**
         * Checks if the boss is dead.
         */
        checkIfDead() {
            if (this.energy <= 0) {
                this.isBossDead = true;
            }
        }
    }
    