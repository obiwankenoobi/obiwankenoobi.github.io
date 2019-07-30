import { CountFramesClass } from "../countFrames";
import { VectorClass } from "../vector";
import { BallClass, Config } from "../ball"
import { Vehicle } from "./vehicle";
import { animations } from "../index";


const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const foods = createObjects(50);
const poisons = createObjects(10);

let mousePos = { x: 0, y: 0 }

const ctx = canvas.getContext("2d");
const vehicle = new Vehicle();


function createObjects(numOfObjects: number) {
    const holder = []
    for (let idx = 0; idx < numOfObjects; idx++) {
        const defaultConfig: Config = {
            acc:      { x: 0, y: 0 },
            pos:      { x: Math.floor(Math.random() * canvas.width), 
                        y: Math.floor(Math.random() * canvas.height) },
            velocity: { x: 0, y: 0 },
            mass: 1
        }
        const obj = new BallClass(defaultConfig);
        holder.push(obj);
    }
    return holder;
}

function showObjects(arr:Array<BallClass>, color:string) {
    for (const obj of arr) {
        drawShape(obj.pos, color, 2)
    }
}

function setup() {
    canvas.style.backgroundColor = "black";
}
    
function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {

    /// getBoundingClientRect is supported in most browsers and gives you
    /// the absolute geometry of an element
    const rect = canvas.getBoundingClientRect();

    /// as mouse event coords are relative to document you need to
    /// subtract the element's left and top position:
    mousePos = {x: e.clientX - rect.left, y: e.clientY - rect.top};
}

function drawShape(position: VectorClass, color: string, size: number) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()
}


function drawMe(vector: Vehicle, color: string, size: number) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(vector.pos.x, vector.pos.y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMe(vehicle, "blue", 8);

    showObjects(foods, "green")
    showObjects(poisons, "red")
    vehicle.seek(foods, "food");
    vehicle.seek(poisons, "poison");
    vehicle.bounderies();
    vehicle.move();
    const animationId = requestAnimationFrame(draw);
    animations.add(animationId);
}


export function startAdvencedSteering() {
    animations.clear(null);
    setup();
    draw();    
}
