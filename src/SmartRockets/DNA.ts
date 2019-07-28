import  { VectorClass } from "../vector"
const canvas = <HTMLCanvasElement> document.getElementById("canvas");

export class DNA {

    public genes: Array<VectorClass>;

    constructor(dnaLen: number, dna:Array<VectorClass>) {
        this.genes = [];
        if (dna && dna.length) {
            this.genes = dna;
        } else {
            for (let idx = 0; idx < dnaLen; idx++) {
                this.genes[idx] = VectorClass.randomVector(canvas.width, canvas.height);               
                this.genes[idx].setMag(0.1);
            }
        }
    }

    crossOver(partner: DNA): Array<VectorClass> {
        const newGenes: Array<VectorClass> = []
        const mid = Math.floor(Math.random() * this.genes.length);

        for (let idx = 0; idx < this.genes.length; idx++) {
            if (idx > mid) {
                newGenes[idx] = this.genes[idx];
            } else {
                newGenes[idx] = partner.genes[idx];
            }            
        }

        return newGenes;
    }
}



