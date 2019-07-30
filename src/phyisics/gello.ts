import { VectorClass } from "../vector";
import { BallClass } from "../ball";
import { CountFramesClass } from "../countFrames";
import { animations } from "../index";

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const { createBalls, drawBalls, bounderyCheck, drawFrameCounter } = require("../phyisics/helpers");

let animationId: number;
let framesCounter: CountFramesClass;
let balls: Array<typeof BallClass> = [];


function setupGello() {
    balls = []; // clearing balls
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#000";
    framesCounter = new CountFramesClass();
    balls = createBalls(5, canvas);
}



function drawRect(x:number, y: number, width: number, height: number, color: string) {
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
}   

function isInsideGello(x: number, y: number) {
    return y > canvas.height / 2;
}

function drawBall(item: BallClass, color: string) {

    let drag: VectorClass;
    let gravity: VectorClass;

    gravity = new VectorClass(0, 0.3)
    gravity.mult(item.mass); // allow us to get the same gravity force no matter the mass

    drag = item.velocity.get();
    drag.normalize();

    const speed = item.velocity.mag();

    if (isInsideGello(item.pos.x, item.pos.y)) {
        drag.mult(speed * speed * -0.125); // gello drag
    } else {
        drag.mult(speed * speed * -0.001); // air drag
    }

    item.applyForce(drag);
    item.applyForce(gravity);
    

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    bounderyCheck(item, canvas);
    item.move();
}


function drawGello() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawRect(0, canvas.height / 2, canvas.width, canvas.height / 2, "lightgrey");

    drawBalls(
        balls, 
        "red", 
        (ball: BallClass, color: string) => drawBall(ball, color));

    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawGello);
    animations.add(animationId);
}




export function startGello() {
    animations.clear(null);
    setupGello();
    drawGello();
}


