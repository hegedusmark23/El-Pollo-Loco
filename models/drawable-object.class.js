
class DrawableObject {
    x = 100;
    y = 100;
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
    * Loads the starting image of the animation.
    * @param {Array} path 
    */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img src="" id="img">
        this.img.src = path
    }

    /**
    * Loads the images from given array.
    * @param {Array} arr 
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke();
        }
    }


}