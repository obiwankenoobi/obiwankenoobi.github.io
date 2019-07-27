const { startBouncing } = require("./bouncing");
const { startOrbit } = require("./orbiting");
const { startGello } = require("./gello");

const bouncingBtn = document.querySelector("#bouncing-btn");
const orbitingBtn = document.querySelector("#orbiting-btn");
const gelloBtn = document.querySelector("#gello-btn");

bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
