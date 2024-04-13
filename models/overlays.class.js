
class Overlay extends DrawableObject {
    audio = {
        win_sound : new Audio('audio/win.mp3'),
        lose_sound : new Audio('audio/lose.wav')
    }
    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.AudioToArray(this.audio)
        this.x = x;
        this.y = y;
        this.width = 720;
        this.height = 480;
    }
}