import { randomNumber } from "./Helpers"


export class VectorClass {

    public x:number;
    public y:number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector: VectorClass) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    angle(vector: VectorClass) {
        const mag = this.mag();
        const vectorMag = vector.mag();
        return Math.cos((this.x * vector.x + this.y * vector.y) / mag * vectorMag);
    }

    sub(vector: VectorClass) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    static sub(vectorA: VectorClass, vectorB: VectorClass) {
        return new VectorClass(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }

    mult(multBy: number) {
        this.x *= multBy;
        this.y *= multBy;
        return this; 
    }

    div(divBydivBy: number) {
        this.x /= divBydivBy;
        this.y /= divBydivBy;
        return this;
    }

    
    static div(vector: VectorClass, divBy: number) {    
        return new VectorClass(vector.x / divBy, vector.y / divBy);
    }

    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    setMag(num: number) {
        this.normalize();
        this.mult(num);
    }

    normalize() {
        const mag: number = this.mag()
        this.x = mag === 0 ? 0 : this.x / mag;
        this.y = mag === 0 ? 0 : this.y / mag;
        return this;
    }

    max(val: number) {
        if (Math.abs(this.x) > val) { 
            this.x = this.x  < 0 ? -1 * val : val;
        }
        if (Math.abs(this.y) > val) { 
            this.y = this.y < 0 ? -1 * val : val;
        }
    }

    dist(vector: VectorClass) {
        const dist = VectorClass.sub(vector, this);
        const distLen = dist.mag();
        return distLen;
    }

    static randomVector(startWidth:number, endWidth:number, startHeight:number, endHeight:number) {

        const x: number = Math.floor(randomNumber(startWidth, endWidth));
        const y: number = Math.floor(randomNumber(startHeight, endHeight));
        return new VectorClass(x, y);
    }

    get() {
        return new VectorClass(this.x, this.y);
    }
}

