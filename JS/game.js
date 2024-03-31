let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let isMuted = false;
let background_music = new Audio('audio/background-music.mp3');

soundEffects = [
    background_music,

];


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playBackgoundMusic();
    handleDisappearingObjects();
}

function handleDisappearingObjects(){
    startScreen = document.getElementById('start-screen');
    topRightButtons = document.getElementById('top-right-buttons');
    startScreen.classList.add('d-none');
    topRightButtons.classList.remove('d-none');
}

function fullScreen() {
    if (isFullscreen == false) {
        this.canvas.requestFullscreen();
        isFullscreen = true;
        console.log(isFullscreen);
    } else {
        this.document.exitFullscreen();
        isFullscreen = false;
        console.log(isFullscreen);
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

function toggleMuteAudio(){
     if (isMuted == false) {
        soundEffects.forEach(sound => { sound.muted = true });
        isMuted = true;
        document.getElementById('volume-icon').src = "img/mute.png";
    } else {
        soundEffects.forEach(sound => { sound.muted = false });
        isMuted = false;
        document.getElementById('volume-icon').src = "img/volume.png";
    }
}

function playBackgoundMusic() {
    background_music.play();
    background_music.volume = 0.02;
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