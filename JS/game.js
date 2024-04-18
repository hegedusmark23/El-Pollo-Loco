let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let isMuted = false;
let stopGame = false;
let background_music = new Audio('audio/background-music.mp3');
let soundEffects = [
    background_music,

];
let intervalIds = [];


/**
 * Initializes the game.
 */
function init() {
    // Initializes the level.
    initLevel();
    // Retrieves the canvas element.
    canvas = document.getElementById('canvas');
    // Creates a new World instance.
    world = new World(canvas, keyboard);
    // Plays background music.
    playBackgoundMusic();
    // Handles disappearing objects on the screen.
    handleDisappearingObjects();
    // Sets up idle functionality.
    idle();
    // Sets up events for mobile buttons.
    mobileButtonsPressEvents();
    // Handles toggling mobile buttons.
    handleMobileButtons();
}

function restartGame() {
    stopGame = false;
    world = null;
    hideObject('restart-button');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playBackgoundMusic();
    idle();
    mobileButtonsPressEvents();
    handleMobileButtons();
}

/**
 * Handles disappearing objects on the screen.
 */
function handleDisappearingObjects() {
    startScreen = document.getElementById('start-screen');
    topRightButtons = document.getElementById('top-right-buttons');
    // Hides the start screen and reveals top right buttons.
    startScreen.classList.add('d-none');
    topRightButtons.classList.remove('d-none');
}

/**
 * Toggles full screen mode.
 */
function fullScreen() {
    // Retrieves necessary elements.
    let container = document.getElementById('canvas-mask');
    let canvas = document.getElementById('canvas');
    let icon = document.getElementById('fullscreen-icon');
    // Enters full screen mode if not already in it.
    if (isFullscreen == false) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
        // Sets canvas dimensions and changes icon.
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        icon.src = 'img/exit-fullscreen.png';
        isFullscreen = true;
    } else {
        // Exits full screen mode and changes icon.
        this.document.exitFullscreen();
        icon.src = 'img/full-screen.png';
        isFullscreen = false;
    }
}

/**
 * Toggles display of controls window.
 */
function toggleControls() {
    let controlsWindow = document.getElementById('controls-window');
    // Toggles visibility of controls window.
    if (controlsWindow.classList.contains('d-none')) {
        controlsWindow.classList.remove('d-none');
        controlsWindow.classList.add('d-flex');
    } else {
        controlsWindow.classList.remove('d-flex');
        controlsWindow.classList.add('d-none');
    }
}

/**
 * Reveals an object by its ID.
 * @param {string} id - The ID of the object to reveal.
 */
function revealObject(id) {
    let button = document.getElementById(id);
    button.classList.remove('d-none');
    button.classList.add('d-flex');
}

/**
 * Hides an object by its ID.
 * @param {string} id - The ID of the object to hide.
 */
function hideObject(id) {
    let button = document.getElementById(id);
    button.classList.remove('d-flex');
    button.classList.add('d-none');
}

/**
 * Toggles mute state of audio.
 */
function toggleMuteAudio() {
    // Toggles mute state and updates volume icon.
    if (isMuted == false) {
        soundEffects.forEach(sound => { sound.muted = true });
        isMuted = true;
        document.getElementById('volume-icon').src = "img/mute.png";
        world.muted = true;
    } else {
        soundEffects.forEach(sound => { sound.muted = false });
        isMuted = false;
        document.getElementById('volume-icon').src = "img/volume.png";
        world.muted = false;
    }
}

/**
 * Plays background music.
 */
function playBackgoundMusic() {
    // Plays background music with reduced volume.
    background_music.play();
    background_music.volume = 0.02;
}

/**
 * Reloads the page.
 */
function reloadPage() {
    location.reload();
}

/**
 * Sets up idle functionality.
 */
function idle() {
    // Sets up timers for short and long idle states.
    function shortIdle() {
        keyboard.idle = true;
    }

    function longIdle() {
        keyboard.idle = false;
        keyboard.long_idle = true;
    }

    var shortIdleTimer;
    var longIdleTimer;
    function resetTimer() {
        keyboard.idle = false;
        keyboard.long_idle = false;
        clearTimeout(shortIdleTimer);
        clearTimeout(longIdleTimer);
        shortIdleTimer = setTimeout(shortIdle, 3000);
        longIdleTimer = setTimeout(longIdle, 7000);
    }
    // Resets timers on user activity.
    window.addEventListener('mousemove', resetTimer, true);
    window.addEventListener('mousedown', resetTimer, true);
    window.addEventListener('click', resetTimer, true);
    window.addEventListener('keydown', resetTimer, true);
    window.addEventListener('touchstart', resetTimer, true);
}

// Event listeners for keyboard input.
window.addEventListener("keydown", (e) => {
    // Sets keyboard flags based on key presses.
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
    // Resets keyboard flags based on key releases.
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

/**
 * Sets up event listeners for mobile buttons.
 */
function handleMobileButtons(){
    // Reveals or hides mobile controls based on window width.
    setInterval(() => {
        if (window.innerWidth < 1000) {
            revealObject("mobile-controls");
        } else {
            hideObject("mobile-controls")
        }
    }, 100);
}

/**
 * Sets up event listeners to show/hide turn device warning based on window width.
 */
function handleTurnDeviceWarning(){
    setInterval(() => {
        if (window.innerWidth < 600) {
            revealObject("turn-device-warning");
        } else {
            hideObject("turn-device-warning")
        }
    }, 100);
}

/**
 * Sets up event listeners for mobile buttons press events.
 */
function mobileButtonsPressEvents() {
    // Event listeners for touch events on mobile buttons.
    document.getElementById('left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}