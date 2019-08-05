import { VectorClass } from "../../vector";
import { CountFramesClass } from "../../countFrames";

const framesPerMinute = new CountFramesClass();
const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class City {
    public cities:VectorClass[] = [];
    public radius:number = 5;
    public resultsLen:number = 0;
    public bestPath:VectorClass[] = [];
    public bestPathLen:number = Infinity;
    public maxOpts:number = 0;

    constructor(x:number = null, y:number = null) {
        if (x && y)     
            this.cities.push(new VectorClass(x, y)); 
    }


    addOne(x:number, y:number) {
        this.cities.push(new VectorClass(x, y));
    }

    addRandom(num:number) {
        this.maxOpts = this.factorial(num)
        for (let count = 0; count < num; count++) 
            this.cities.push(VectorClass.randomVector( 50, canvas.width - 50 , 50 , canvas.height - 50 ));    
    }

    show(cities:VectorClass[] = this.cities) {
        for (const city of cities) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.arc(city.x, city.y, this.radius, 0, Math.PI * 2);    
            ctx.fill();      
            ctx.closePath();  
        }
    }

    connect(cityA:VectorClass, cityB:VectorClass, color:string) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(cityA.x, cityA.y);
        ctx.lineTo(cityB.x, cityB.y);
        ctx.stroke();
    }

    connectAll(cities:VectorClass[], color:string) {
        
        let len = 0;
        for (let i = 0; i < cities.length; i++) {
            if (cities[i + 1]) {
                this.connect(cities[i], cities[i + 1], color);  
                len += cities[i].dist(cities[i + 1]);
            }
        }

        if (len < this.bestPathLen) {
            this.bestPathLen = len;
            this.bestPath = cities;
        }
    }


    wait(ms:number) {
        return new Promise(resolve => setTimeout(resolve, Math.floor(ms)));
    }; 

    async searchShortestPath(cities:VectorClass[] = this.cities, result:VectorClass[] = []) {

        if (!cities.length) {
            await this.wait(1000 / 60);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.connectAll(result, "white");
            this.show(result);

            // clear the white path when we have found the optimal path
            if (this.resultsLen === this.maxOpts - 1) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            this.connectAll(this.bestPath, "red");
            this.show(this.bestPath);
            framesPerMinute.drawFrameCounter();

            this.resultsLen++;
        }

        for (let idx = 0; idx < cities.length; idx++) {
            const current = cities.shift();
            await this.searchShortestPath(cities, [...result, current]);
            cities.push(current);
        }

    }

    factorial(num:number):number {
        if (num === 1) return num;

        return num *= this.factorial(num - 1);
    }


    clear() {
        this.cities = [];
        this.bestPathLen = Infinity;
        this.bestPath = [];
        this.resultsLen = 0;
        this.maxOpts = 0;
    }
}