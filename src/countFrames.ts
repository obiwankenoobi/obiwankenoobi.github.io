class CountFramesClass {
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
    reset() { this.frames = 1; }
}

interface CountFramesClass {
    frames: number;
    lastTime: number;
    lastSecondFrames: number;
}

module.exports = CountFramesClass;