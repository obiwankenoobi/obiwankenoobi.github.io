import { Grid, Maze, RowColCoords } from "./grid"
import { CountFramesClass } from "../countFrames"
import { animations } from "../index";

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frameCounter = new CountFramesClass();
let maze:Maze;



function setup() {
    canvas.style.backgroundColor = "#151513";
    maze = new Maze(50, 50, canvas);
    maze.setStartFinish([0,0], [maze.rows - 1, maze.cols - 1]);
    maze.dfs(maze.start);
}


function draw() {
    ctx.clearRect(0, canvas.height - 25, 75, 25);

    maze.draw();
    if (maze.stack.length && !maze.done) {
        const current = maze.stack.shift();
        maze.dfs(current);
    } else {
        if (!maze.visited[maze.visited.length - 1].previous) return;
        
        let path = [];
        let current = maze.visited[maze.visited.length - 1].previous;

        while(current.previous) {
            path.push(current);
            maze.fill(current, "rgb(245, 139, 146");
            current = current.previous;
        }
        return console.log(path);
    }
    frameCounter.drawFrameCounter();
    const animation = requestAnimationFrame(draw);
    animations.add(animation);
}



export function startDFS() {
    animations.clear(null);
    setup();
    draw();
}