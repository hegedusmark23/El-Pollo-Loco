class MoveableObject {
    x = 100;
    y = 240;
    img;
    height = 200;
    width = 100;
    speed = 0.25;
    imageCache = {};
    currentImage = 0;

    //loadImage('img/test.pmg')
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
            this.imageCache[path] = img;
        });

    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}