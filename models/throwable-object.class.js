
class ThrowableObject extends MoveableObject {
    audio = {
      throw_sound : new Audio('audio/throw.mp3')  
    }
    
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.AudioToArray(this.audio);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
    }

    throw() {
        this.speedY = 7;
        this.applyGravity();
        this.audio['throw_sound'].volume  = 0.1 ;
        this.audio['throw_sound'].play();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}