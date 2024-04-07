
class Clouds extends MoveableObject {
    y = 0;
    height = 400;
    

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;//Math.random() * 3000;
        this.width = 720;
        this.animate();
    }

    animate() {
        let interval = setInterval(() => {
            this.moveLeft();
        }, 20);
        intervalIds.push(interval);
    }

    
}