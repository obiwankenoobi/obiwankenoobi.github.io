import { BallClass } from "../ball";
import { VectorClass } from "../vector"
import { DNA } from "./DNA";

const canvas = <HTMLCanvasElement> document.getElementById("canvas");


export class Rocket extends BallClass {
    
    public dna: DNA;
    public dnaLen:number;
    public pos: VectorClass;
    public fitness: number;
    public complete: boolean;
    public crashed: boolean;


    constructor(dnaLen: number, dna: Array <VectorClass> = []) {
        super();
        this.dna = new DNA(dnaLen, dna);
        this.dnaLen = dnaLen;
        this.pos = new VectorClass(canvas.width / 2, canvas.height - 20);
        this.fitness = 0;
        this.complete = false;
        this.crashed = false;
    }

    
    bounderyCheck(target: VectorClass) {
   
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


    calcFitness(target: VectorClass) {
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
            const randomVector = VectorClass.randomVector(-canvas.width, canvas.width, -canvas.height, canvas.height);               
            randomVector.setMag(0.1);
            this.dna.genes[randomIdx] = randomVector;
        }
    }

}
