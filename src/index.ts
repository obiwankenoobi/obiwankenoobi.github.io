const { startBouncing } = require("./phyisics/bouncing");
const { startOrbit } = require("./phyisics/orbiting");
const { startGello } = require("./phyisics/gello");
const { startRocket } = require("./SmartRockets/index");

const bouncingBtn = document.querySelector("#bouncing-btn");
const orbitingBtn = document.querySelector("#orbiting-btn");
const gelloBtn = document.querySelector("#gello-btn");
const rocketBtn = document.querySelector("#rocket-btn");

bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
rocketBtn.addEventListener("click", startRocket);
