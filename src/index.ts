import { Animations } from "./animations"
export const animations = new Animations();


const { startBouncing } = require("./phyisics/bouncing");
const { startOrbit } = require("./phyisics/orbiting");
const { startGello } = require("./phyisics/gello");
const { startRocket } = require("./SmartRockets/index");
const { startAdvencedSteering } = require("./Steering/index");
const { startAStart } = require("./Graphs/astar");
const { startBFS } = require("./Graphs/bfs");

const bouncingBtn = document.querySelector("#bouncing-btn");
const orbitingBtn = document.querySelector("#orbiting-btn");
const gelloBtn = document.querySelector("#gello-btn");
const rocketBtn = document.querySelector("#rocket-btn");
const steeringAdvencedBtn = document.querySelector("#steering-advenced-btn");
const AStarBtn = document.querySelector("#a-star-btn");
const bfsBtn = document.querySelector("#bfs-btn");

bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
rocketBtn.addEventListener("click", startRocket);
steeringAdvencedBtn.addEventListener("click", startAdvencedSteering);
AStarBtn.addEventListener("click", startAStart);
bfsBtn.addEventListener("click", startBFS);
