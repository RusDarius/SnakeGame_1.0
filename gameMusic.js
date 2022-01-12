// the game music management

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

var gameOv = new sound("sfx-defeat3.mp3");
var mySound = new sound("mixkit-video-game-retro-click-237.wav");
var myMusic = new sound("07 - Death by Glamour - Extended.mp3");
var mySoundSuper = new sound("mixkit-arcade-video-game-scoring-presentation-274.wav");

export function enableLoop() {
    myMusic.play();
}

export function gameOver() {
    gameOv.play();
    myMusic.stop();
    setTimeout(location.reload(), 1500);
    alert("GameOver!");
}

export function ateFood() {
    mySound.play();
}

export function ateSuperFood() {
    mySoundSuper.play();
}