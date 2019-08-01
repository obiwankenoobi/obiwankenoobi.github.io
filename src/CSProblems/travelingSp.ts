import { animations } from "../index";
//import { drawFrameCounter } from "../phyisics/helpers";
import { CountFramesClass } from "../countFrames";
let framesPerMinute = new CountFramesClass();


const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setup() {
    canvas.style.backgroundColor = "#000";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    framesPerMinute.drawFrameCounter();
    const animationId = requestAnimationFrame(draw);
    animations.add(animationId);
    
}

export function startTraveling() {
    animations.clear(null);
    setup();
    draw();
}



