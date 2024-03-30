let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;


function init() {
    startScreen = document.getElementById('start-screen');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startScreen.classList.add('d-none');
}

function fullScreen() {
    if (isFullscreen == false) {
        this.canvas.requestFullscreen();
        isFullscreen = true;
    } else {
        this.document.exitFullscreen();
        isFullscreen = false;
    }
}

function toggleControls(){
    let controlsWindow = document.getElementById('controls-window');
    if (controlsWindow.classList.contains('d-none')) {
        controlsWindow.classList.remove('d-none')
        controlsWindow.classList.add('d-flex')
    } else {
        controlsWindow.classList.remove('d-flex')
        controlsWindow.classList.add('d-none')
    }
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    } if (e.keyCode == 37) {
        keyboard.LEFT = true;
    } if (e.keyCode == 40) {
        keyboard.DOWN = true;
    } if (e.keyCode == 38) {
        keyboard.UP = true;
    } if (e.keyCode == 32) {
        keyboard.SPACE = true;
    } if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    } if (e.keyCode == 37) {
        keyboard.LEFT = false;
    } if (e.keyCode == 40) {
        keyboard.DOWN = false;
    } if (e.keyCode == 38) {
        keyboard.UP = false;
    } if (e.keyCode == 32) {
        keyboard.SPACE = false;
    } if (e.keyCode == 68) {
        keyboard.D = false;
    }
});