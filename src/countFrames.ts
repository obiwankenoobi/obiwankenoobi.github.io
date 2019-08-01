const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class CountFramesClass {
    public frames: number;
    public lastSecondFrames: number;
    public lastTime: number;
    
    constructor() {
        this.frames = 1;
        this.lastSecondFrames = 0;
        this.lastTime = Math.ceil(new Date().getTime() / 1000);
    }

    add()  {
        const now: number = Math.ceil(new Date().getTime() / 1000);

        if (now !== this.lastTime) {
            this.lastSecondFrames = this.frames;
            this.reset();
            this.lastTime = now;
        } else { this.frames++; }
    }

    drawFrameCounter() {
        this.add();
        ctx.beginPath();
        ctx.font = "14px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("FPS:" + this.lastSecondFrames, 10, canvas.height - 10);
        ctx.closePath();
    }


    reset() { this.frames = 1; }
}

