const { startBouncing } = require("./phyisics/bouncing");
const { startOrbit } = require("./phyisics/orbiting");
const { startGello } = require("./phyisics/gello");

const bouncingBtn = document.querySelector("#bouncing-btn");
const orbitingBtn = document.querySelector("#orbiting-btn");
const gelloBtn = document.querySelector("#gello-btn");

bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
