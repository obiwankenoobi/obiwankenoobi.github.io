import { animations } from "../../index";
import { City } from "./city"

const canvas = <HTMLCanvasElement> document.getElementById("canvas");


async function setup() {
    canvas.style.backgroundColor = "#151513";
    const cities = new City();
    cities.addRandom(6);
    cities.searchShortestPath();
}
//

export function startTraveling() {
    animations.clear(null);
    setup();
}



