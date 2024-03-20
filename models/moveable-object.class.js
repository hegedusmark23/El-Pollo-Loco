class MoveableObject {
    x = 100;
    y = 200;
    img;
    height = 200;
    width = 100;

    //loadImage('img/test.pmg')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img src="" id="img">
        this.img.src = path
    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){

    }
}