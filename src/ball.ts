import { VectorClass } from "./vector";

export interface Config {
    acc:      { x: number, y:number },
    pos:      { x: number, y:number },
    velocity: { x: number, y:number },
    mass: number;
}

const defaultConfig: Config = {
    acc:      { x: 0, y: 0 },
    pos:      { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    mass: 1
}

 export class BallClass {
     public acc: VectorClass;
     public velocity: VectorClass;
     public mass: number;
     public pos: VectorClass;
     public radius: number;
     
    constructor(config: Config = defaultConfig) {

        this.acc      = new VectorClass(config.acc.x, config.acc.y);
        this.velocity = new VectorClass(config.velocity.x, config.velocity.y);
        this.mass     = config.mass;
        this.pos      = new VectorClass(config.pos.x, config.pos.y);
        this.radius   = this.mass * 5;
    }

    move() {
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);
        this.acc.mult(0);
    }

    limitVelocity(num: number) {
        this.velocity.max(num);
    }

    applyForce(force: VectorClass) {
        // nyuton second law
        // accelaration = force / mass;
        const f = VectorClass.div(force, this.mass);
        this.acc.add(f);
    }
}




