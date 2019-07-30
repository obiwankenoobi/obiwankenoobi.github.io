const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class Animations {
    public animations:Array<number> = [];

    add(id:number) { this.animations.push(id) }

    clear(id:number | null) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        if (id) {
            this.animations = this.animations.filter(i => i !== id);
            return cancelAnimationFrame(id);
        }
        this.animations.forEach(i => cancelAnimationFrame(i));
    }
}