
class Bottles extends MoveableObject {
    height = 80;
    width = 80;
    offset = {
        top: 10,
        left: 30,
        right: 30,
        bottom: 10,
    }
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    audio = {
        item_pickup_sound : new Audio('audio/item-pickup.mp3')
    }
    
    bottlesImg = this.IMAGES_BOTTLE[Math.floor(Math.random()*this.IMAGES_BOTTLE.length)];

    constructor(x, y){
        super().loadImage(this.bottlesImg);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        let increasing = true; 
        setInterval(() => {
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
    }

}