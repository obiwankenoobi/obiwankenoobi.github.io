import { BallClass } from "../ball";
import { VectorClass } from "../vector";
const canvas = <HTMLCanvasElement> document.getElementById("canvas");


export class Vehicle extends BallClass {

    private maxSpeed: number = 1;
    private maxSteer: number = 0.2;
    public steer: VectorClass = new VectorClass();
    public closestEl: VectorClass = new VectorClass();
    public foodSight = 100;
    public poisonSight = 16;



    bounderies() {
        let target;
        if (this.pos.x > canvas.width || this.pos.x < 0) {

            if (this.velocity.x > 0 && this.velocity.y > 0) {
                target = new VectorClass(canvas.width / 2, canvas.height);
            } else if (this.velocity.x > 0 && this.velocity.y < 0) {
                target = new VectorClass(canvas.width / 2, 0);
            } else if (this.velocity.x < 0 && this.velocity.y > 0) {
                target = new VectorClass(canvas.width / 2, canvas.height);
            } else if (this.velocity.x < 0 && this.velocity.y < 0) {
                target = new VectorClass(canvas.width / 2, 0);
            }

            const desire = VectorClass.sub(target, this.pos);
            desire.setMag(this.maxSpeed);
    
            const steer = VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);

            this.applyForce(steer);

        }

        if (this.pos.y > canvas.height || this.pos.y < 0) {

            if (this.velocity.x > 0 && this.velocity.y > 0) {
                target = new VectorClass(canvas.width, canvas.height / 2);
            } else if (this.velocity.x > 0 && this.velocity.y < 0) {
                target = new VectorClass(canvas.width / 2, 0);
            } else if (this.velocity.x < 0 && this.velocity.y > 0) {
                target = new VectorClass(0, canvas.height / 2);
            } else if (this.velocity.x < 0 && this.velocity.y < 0) {
                target = new VectorClass(0, canvas.height / 2);
            }

            const desire = VectorClass.sub(target, this.pos);
            desire.setMag(this.maxSpeed);
    
            const steer = VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);

            this.applyForce(steer);
        }
    }

    seek(targetArr: Array<BallClass>, targetName: string) {

        let closestDist = Infinity;
        let closestIdx = -1;
        let closestEl = null;

        if (!targetArr.length) {
            return;
        }

        const sight = targetName === "poison" ? this.poisonSight : this.foodSight;

        for (let idx = targetArr.length - 1; idx >= 0; idx--) {

            const target = targetArr[idx];
            
            const dist = this.pos.dist(target.pos);
            
            if (dist < closestDist && dist < sight) {
                closestEl = target;
                this.closestEl = closestEl.pos;
                closestIdx = idx;
                closestDist = dist;
  
            }

            if (closestDist < 10) {
                targetArr.splice(closestIdx, 1);
                closestDist = Infinity;
            }
        }

        if (closestEl) {

            const maxSpeed = targetName !== "poison" ? this.maxSpeed : - (this.maxSpeed * 0.7)

            const desire = VectorClass.sub(closestEl.pos, this.pos);
            desire.setMag(maxSpeed);

            const steer = VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);
            this.steer = steer;
            this.applyForce(steer);
        }
    }
}