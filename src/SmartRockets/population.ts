import { Rocket } from "./rocket";
import { VectorClass } from "../vector";
const canvas = <HTMLCanvasElement> document.getElementById("canvas");

export class Population {

    private population: Array<Rocket>;
    
    constructor(numOfPopulation: number, dnaLen: number) {
        this.population = [];
        for (let idx = 0; idx < numOfPopulation; idx++) {
            this.population[idx] = new Rocket(dnaLen, []);
        }
    }

    // pick a parent based on its score
    pickOne(): Rocket {
        let random = Math.random();
        let idx = 0;
        
        while (random > 0) {
            random -= this.population[idx].fitness;
            idx++;
        }

        idx--;
        return this.population[idx];
    }


    evaluate(target: VectorClass): void {
        let maxFitness = 0;
        this.population.forEach(citizen => {
            citizen.calcFitness(target);
            
            if (citizen.fitness > maxFitness) {
                maxFitness = citizen.fitness;
            }
        });

        // normalizing fitness between 0-1
        this.population.forEach(citizen => 
            citizen.fitness = citizen.fitness / maxFitness);
    }


    evolve() {
        const newPopulation: Array<Rocket> = [];
        
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
