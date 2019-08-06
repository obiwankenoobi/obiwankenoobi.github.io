import { Animations } from "./animations"
export const animations = new Animations();

const { startBouncing } = require("./phyisics/drag");
const { startOrbit } = require("./phyisics/ga");
const { startGello } = require("./phyisics/friction");
const { startAdvencedSteering } = require("./phyisics/steering");

const { startTraveling } = require("./CSProblems/TravelingSP/travelingSp");

const { startRocket } = require("./SmartRockets/index");

const { startAStart } = require("./Graphs/astar");
const { startBFS } = require("./Graphs/bfs");
const { startDFS } = require("./Graphs/dfs");
const { showImg } = require("./Projects");

const bouncingBtn = document.querySelector("#bouncing-btn");
const orbitingBtn = document.querySelector("#orbiting-btn");
const gelloBtn = document.querySelector("#gello-btn");
const rocketBtn = document.querySelector("#rocket-btn");
const steeringAdvencedBtn = document.querySelector("#steering-advenced-btn");
const AStarBtn = document.querySelector("#a-star-btn");
const bfsBtn = document.querySelector("#bfs-btn");
const dfsBtn = document.querySelector("#dfs-btn");
const tsBtn = document.querySelector("#ts-btn");
const miniEditorBtn = document.querySelector("#miniEditor-btn");

bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
rocketBtn.addEventListener("click", startRocket);
steeringAdvencedBtn.addEventListener("click", startAdvencedSteering);
AStarBtn.addEventListener("click", startAStart);
bfsBtn.addEventListener("click", startBFS);
dfsBtn.addEventListener("click", startDFS);
tsBtn.addEventListener("click", startTraveling);
miniEditorBtn.addEventListener("click", showImg);
