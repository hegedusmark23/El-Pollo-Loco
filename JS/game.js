let canvas;
let world;
let keyboard = new Keyboard();Ł 


function init(){
canvas = document.getElementById('canvas');
world = new World(canvas);
console.log('My character is', world.enemies)
}


window.addEventListener("keypress", (e) => {
    console.log(e);
});