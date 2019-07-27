const { VectorClass } = require("./vector")
const CountFrames = require("./countFrames");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const { BallClass,  BallConfig } = require("./ball");
const { bounderyCheck, drawFrameCounter } = require("./helpers");

let animationId: number;

let framesCounter: CountFramesClass;

let gravity: typeof VectorClass;
gravity = new VectorClass();

let attractor: typeof BallClass;
let attractorConfig: typeof BallConfig;

let attracted: typeof BallClass;
let attractedConfig: typeof BallConfig;


function setupOrbit() {
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#000";


    framesCounter = new CountFrames();

    attractorConfig = {
        acc:      { x: 0, y: 0 },
        pos:      { x: canvas.width / 2, y:  canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        mass: 2
    }

    attractedConfig = {
        acc:      { x: 0, y: 0 },
        pos:      { x: canvas.width / 4, y:  canvas.height / 4 },
        velocity: { x: 1, y: 0 },
        mass: 1
    }



    attracted = new BallClass(attractedConfig);
    attractor = new BallClass(attractorConfig);
    
}


function drawItem(item: typeof BallClass, color: string) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}


function drawOrbit() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawItem(attractor, "red");
    drawItem(attracted, "blue");
    
    const attractorForce = VectorClass.sub(attractor.pos, attracted.pos);
    let distance: number;
   

    // limiting the dstance
    const attractorForceMag = attractorForce.mag();
    if (attractorForceMag > 25) {
        distance = 25;
    } else if (attractorForceMag < 5) {
        distance = 5;
    }
    attractorForce.normalize();



    const c = 10;
    const gravityForce: number = 
        ((c * attractor.mass * attracted.mass) / (distance * distance));

    attractorForce.mult(gravityForce);
    attracted.applyForce(attractorForce);

    
    attractor.move();
    attracted.move();

    bounderyCheck(attractor, canvas);
    bounderyCheck(attracted, canvas);

    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawOrbit);
}


export function startOrbit() {
    setupOrbit();
    drawOrbit();
}


