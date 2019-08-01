import { Rocket } from "./rocket";
import { CountFramesClass } from "../countFrames";
import { VectorClass } from "../vector";
import { animations } from "../index";
const { Population } = require("./population");




const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let framesPerMinute = new CountFramesClass();
const lifeSpan = 400;
const target = new VectorClass(canvas.width / 2, 50);

let framesCounter = 0;
let rockets: Array<typeof Rocket>;


function rocketSetup(): void {
    
    framesCounter = 0;
    rockets = new Population(100, lifeSpan, canvas);
    canvas.style.backgroundColor = "#151513";
}




function drawTarget() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(target.x, target.y, 8, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath();
}
 
function drawRocket(rocket:Rocket): void {

    ctx.beginPath();
    ctx.fillStyle = "red";
    rocket.applyForce(rocket.dna.genes[framesCounter]);
    rocket.bounderyCheck(target);
    rocket.move();
    ctx.arc(rocket.pos.x, rocket.pos.y, rocket.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawRockets(rockets:typeof Population): void {

    if (framesCounter >= lifeSpan) {
        rockets.evaluate(target);
        rockets.evolve();
        framesCounter = 0;
        return;
    } 
    
    for (const rocket of rockets.population) {
        if (!rocket.crashed && !rocket.complete) {
            drawRocket(rocket);
        }

    }
}

function draw(): void {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawRockets(rockets);
    drawTarget();
    framesCounter++;
    framesPerMinute.drawFrameCounter();
    const animationId = requestAnimationFrame(draw);
    animations.add(animationId)
}

export function startRocket(): void {
    animations.clear(null);
    rocketSetup();
    draw();
}
