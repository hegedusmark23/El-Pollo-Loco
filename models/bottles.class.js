/**
 * Class representing a bottle object.
 */
class Bottles extends MoveableObject {
    height = 80;
    width = 80;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    audio = {
        item_pickup_sound: new Audio('audio/item-pickup.mp3'),
    }
    
    /**
     * Path to the image of the bottle.
     */
    bottlesImg = this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)];

    /**
     * Constructs a new Bottles instance.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     */
    constructor(x, y) {
        // Calls the superclass constructor and loads the image.
        super().loadImage(this.bottlesImg);
        // Converts audio object to array.
        this.AudioToArray(this.audio);
        // Sets the initial coordinates of the bottle.
        this.x = x;
        this.y = y;
        // Animates the bottle object.
        this.animate();
    }

    /**
     * Animates the bottle object.
     */
    animate() {
        let increasing = true;
        let interval = setInterval(() => {
            if (increasing) {
                this.y += 3;
                if (this.y >= 363) {
                    increasing = false;
                }
            } else {
                this.y -= 3;
                if (this.y >= 360) {
                    increasing = true;
                }
            }
        }, 300);
        // Pushes the interval ID to the global array.
        intervalIds.push(interval);
    }
}





