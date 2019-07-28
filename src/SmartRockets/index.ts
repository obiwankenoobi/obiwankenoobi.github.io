const { Rocket } = require("./rocket");
const { Population } = require("./population");
const { BallConfig } = require("../ball");
const { VectorClass } = require("../vector")



const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const lifeSpan = 400;
const target = new VectorClass(canvas.width / 2, 50);

let framesCounter = 0;
let rockets: Array<typeof Rocket>;


function rocketSetup(): void {
    framesCounter = 0;
    rockets = new Population(100, lifeSpan, canvas);
    canvas.style.backgroundColor = "#000";
}

function bounderyCheck(ball: typeof Rocket, canvas: HTMLCanvasElement) {
   
    const distance = VectorClass.sub(ball.pos, target);
    const magnitude = distance.mag();
    

    if (ball.pos.x >= canvas.width) {
        ball.crashed = true;
    } else if (ball.pos.x < 0) {
        ball.crashed = true;
    }
    

    if (ball.pos.y >= canvas.height - ball.radius / 2) {
        ball.crashed = true;
    }  else if (ball.pos.y < 0) {
        ball.crashed = true;
    }

    if (magnitude < 10) {
        console.log("complete")
        console.log({magnitude, ball: ball.pos, target, distance, mag:magnitude })
        ball.complete = true;
    }
}


function drawTarget() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(target.x, target.y, 8, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath();
}
 
function drawRocket(rocket:typeof Rocket): void {

    ctx.beginPath();
    ctx.fillStyle = "red";
    rocket.applyForce(rocket.dna.genes[framesCounter]);
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
        bounderyCheck(rocket, canvas);
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
    requestAnimationFrame(draw);
}

export function startRocket(): void {
    rocketSetup();
    draw();
}
