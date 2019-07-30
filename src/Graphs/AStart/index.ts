import { Grid, Maze, RowColCoords } from "../grid"
import { CountFramesClass } from "../../countFrames"
import PQueue from "fastpriorityqueue";
const { drawFrameCounter } = require("../../phyisics/helpers");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frameCounter = new CountFramesClass();
let maze:Maze;
let showQueue = false;


function setup() {
    canvas.style.backgroundColor = "#000";
    maze = new Maze(25, 25, canvas);
    maze.setStartFinish([0,0], [maze.rows - 1, maze.cols - 1]);
    maze.walk((maze.start));
    console.log(maze.grid);
    console.log("drawing")
}


const a = {w:1}
const b = {w:2}
const c = {w:3}
const d = {w:4}
const e = {w:5}
const f = {w:6}
const g = {w:7}
const h = {w:4}

const q  = new PQueue((a:any,b:any) => a.w < b.w);

function draw() {
    ctx.clearRect(0, canvas.height - 25, 75, 25);

    maze.draw();
    if (!maze.queue.isEmpty() && !maze.done) {
        const current = maze.queue.poll();
        console.log(current)
        maze.walk((current));
    } else {
        let path = [];
        let current = maze.visited[maze.visited.length - 1];
        console.log(current)
        console.log(maze.visited)
        while(current.previous) {
            path.push(current);
            maze.fill(current, "rgb(255, 100, 100");
            current = current.previous;
        }
        return console.log(path);
    }
    drawFrameCounter(frameCounter, ctx, canvas);
    requestAnimationFrame(draw);
}



export function startAStart() {

    q.add(f)
    q.add(h)
    q.add(g)
    q.add(d)
    q.add(b)
    q.add(a)
    q.add(c)
    q.add(e)
    while(!q.isEmpty()) {
        console.log(q.poll());
    }

    setup();
    draw();
}