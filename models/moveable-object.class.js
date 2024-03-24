class MoveableObject {
    x = 100;
    y = 100;
    img;
    height = 200;
    width = 100;
    speed = 0.25;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    acceletation = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceletation;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Loads the starting image of the animation.
     * @param {Array} path 
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img src="" id="img">
        this.img.src = path
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60)
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}