
class Overlay extends DrawableObject {

    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;
        this.width = 720;
        this.height = 480;
    }
}