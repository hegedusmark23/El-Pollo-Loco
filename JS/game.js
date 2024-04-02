let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let isMuted = false;
let background_music = new Audio('audio/background-music.mp3');
let soundEffects = [
    background_music,

];
let intervalIds = [];


function init() {
    initLevel();
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
    let container = document.getElementById('canvas-mask');
    let canvas = document.getElementById('canvas');
    let icon = document.getElementById('fullscreen-icon');
    if (isFullscreen == false) {
        container.requestFullscreen();
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        icon.src = 'img/exit-fullscreen.png'
        isFullscreen = true;
    } else {
        this.document.exitFullscreen();
        icon.src = 'img/full-screen.png'
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