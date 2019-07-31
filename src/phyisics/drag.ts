import  { VectorClass } from "../vector"
import  { CountFramesClass } from "../countFrames";
import { BallClass } from "../ball";
import { animations } from "../index";

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const { createBalls, drawBalls, bounderyCheck, drawFrameCounter } = require("../phyisics/helpers");



let balls: Array<typeof BallClass> = [];
let animationId: number;
let framesCounter: CountFramesClass;

function setupBouncing() {
    balls = [];
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#151513";
    framesCounter = new CountFramesClass();
    balls = createBalls(5, canvas);
}

function drawBall(item: BallClass, color: string) {

    let drag: VectorClass;
    let gravity: VectorClass;
    let wind: VectorClass;

    gravity = new VectorClass(0, 0.7);
    wind = new VectorClass(0, 0);

    gravity.mult(item.mass); // allow us to get the same gravity force no matter the mass
    drag = item.velocity.get();
    const speed = item.velocity.mag();
    drag.normalize();
    drag.mult(speed * speed * -0.001);

    item.applyForce(drag);
    item.applyForce(gravity);
    item.applyForce(wind);

    item.move();

    bounderyCheck(item, canvas);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}


function drawBouncing() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBalls(
        balls, 
        "red", 
        (ball: BallClass, color: string) => drawBall(ball, color));

    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawBouncing);
    animations.add(animationId);
}


export function startBouncing() {
    animations.clear(null);
    setupBouncing();
    drawBouncing();
}


