const { VectorClass } = require("./vector");

interface Config {
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

 class BallClass {
    constructor(config: Config = defaultConfig) {

        this.acc      = new VectorClass(config.acc.x, config.acc.y);
        this.velocity = new VectorClass(config.velocity.x, config.velocity.y);
        this.mass     = config.mass;
        this.pos      = new VectorClass(config.pos.x, config.pos.y);
        this.radius   = this.mass * 5;

        console.log(config.acc, this.acc.y, this.velocity.y)
    }

    move() {
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);
        this.acc.mult(0);
    }

    limitVelocity(num: number) {
        this.velocity.max(num);
    }

    applyForce(force: typeof VectorClass) {
        // nyuton second law
        // accelaration = force / mass;
        const f = VectorClass.div(force, this.mass);
        this.acc.add(f);
    }
}

interface BallClass {
    acc:      any;
    velocity: any;
    pos:      any;
    radius:   number;
    mass:     number;
}



export { BallClass, Config as BallConfig };
