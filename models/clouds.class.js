
class Clouds extends MoveableObject {
    y = 0;
    height = 400;
    

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.width = 720;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    
}