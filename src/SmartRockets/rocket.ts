const { BallClass } = require("../ball");
const { VectorClass } = require("../vector");
const { DNA } = require("./dna");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");


class Rocket extends BallClass {
    constructor(dnaLen: number, dna: Array <typeof VectorClass> = []) {
        super();
        this.dna = new DNA(dnaLen, dna);
        this.dnaLen = dnaLen;
        this.pos = new VectorClass(canvas.width / 2, canvas.height - 20);
        this.fitness = 0;
        this.complete = false;
        this.crashed = false
    }


    bounderyCheck(target: typeof VectorClass) {
   
        const distance = VectorClass.sub(this.pos, target);
        const distanceMagnitude = distance.mag();
        
    
        if (this.pos.x >= canvas.width) {
            this.crashed = true;
        } else if (this.pos.x < 0) {
            this.crashed = true;
        }
        
    
        if (this.pos.y >= canvas.height - this.radius / 2) {
            this.crashed = true;
        }  else if (this.pos.y < 0) {
            this.crashed = true;
        }
    
        if (distanceMagnitude < 10) {
            this.complete = true;
        }
    }


    calcFitness(target: typeof VectorClass) {
        const distance = VectorClass.sub(this.pos, target);
        const magnitude = distance.mag();
        this.fitness = 1 / magnitude;

        if (this.complete) {
            this.fitness *= 10;
        }
    }

    mutate() {
        const random = Math.random();
        if (random <= 0.01) {
            const randomIdx = Math.floor(Math.random() * this.dnaLen);
            const randomVector = VectorClass.randomVector(canvas.width, canvas.height);               
            randomVector.setMag(0.1);
            this.dna.genes[randomIdx] = randomVector;
        }
    }

}
interface Rocket {
    dna: typeof DNA;
    dnaLen: number;
    canvas: HTMLCanvasElement;
    pos: typeof VectorClass;
    fitness: number;
    complete: boolean;
    crashed: boolean;
}

export { Rocket }