const { Rocket } = require("./rocket");
const { VectorClass } = require("../vector");
const canvas = <HTMLCanvasElement> document.getElementById("canvas");

class Population {
    constructor(numOfPopulation: number, dnaLen: number) {
        this.population = [];
        for (let idx = 0; idx < numOfPopulation; idx++) {
            this.population[idx] = new Rocket(dnaLen, []);
        }
    }

    // pick a parent based on its score
    pickOne(): typeof Rocket {
        //console.log("this.population", this.population)
        let random = Math.random();

        let idx = 0;
        
        while (random > 0) {
           // console.log("idx", idx)
            random -= this.population[idx].fitness;
            idx++;
        }

        idx--;
        return this.population[idx];
    }


    evaluate(target: typeof VectorClass): void {
        let maxFitness = 0;
        this.population.forEach(citizen => {
            citizen.calcFitness(target);
            
            if (citizen.fitness > maxFitness) {
                maxFitness = citizen.fitness;
            }
        });

        // normalizing fitness between 0-1
        this.population.forEach(citizen => {
            citizen.fitness = citizen.fitness / maxFitness;
            
            // console.log("==========================")
            // console.log("==========================")
            // console.log("==========================")
            // console.log("citizen.pos", citizen.pos)
            // console.log("target", target)
            // console.log("citizen.fitness", citizen.fitness)
        });

        


    }


    evolve() {
        const newPopulation: Array<typeof Rocket> = [];
        
        for (let idx = 0; idx < this.population.length; idx++) {
            const parentA = this.pickOne();
            const parentB = this.pickOne();
            
            const newDna = parentA.dna.crossOver(parentB.dna);
            const child = new Rocket(newDna.length, newDna);
            child.mutate();
            newPopulation.push(child);
            
        }

        this.population = newPopulation;
        
    }
}

interface Population {
    population: Array<typeof Rocket>;
}

export { Population }