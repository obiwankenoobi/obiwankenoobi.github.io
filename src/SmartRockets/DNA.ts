const { VectorClass } = require("../vector");
const { Rocket } = require("./rocket");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");

class DNA {
    constructor(dnaLen: number, dna:Array<typeof VectorClass>) {
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

    crossOver(partner: typeof Rocket): Array<typeof VectorClass> {
        const newGenes: Array<typeof VectorClass> = []
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

interface DNA {
    genes:Array<typeof VectorClass>;
}

export { DNA };