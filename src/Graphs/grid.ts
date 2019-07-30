import PQueue from "fastpriorityqueue";



export interface RowColCoords {
    row:number;
    col:number;
    weight:number; 
    previous:RowColCoords | null;
    directCost: number;
}


export class Grid {
    public rows: number;
    public cols: number;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public grid: Array<Array<number>>;
    public tileW: number;
    public tileH: number;
    public walls: number = 0.25; 

    constructor(rows:number, cols:number, canvas:HTMLCanvasElement) {
        this.rows   = rows;
        this.cols   = cols;
        this.canvas = canvas;
        this.ctx    = canvas.getContext("2d");
        this.grid   = [];
        this.tileW  = this.canvas.width / this.rows;
        this.tileH  = this.canvas.height / this.cols;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!this.grid[r]) { this.grid[r] = [] }

                const rndm = Math.random();
                rndm < this.walls ? this.grid[r][c] = 1 : this.grid[r][c] = 0;
            }
        }
    }

    fill(rowCol:RowColCoords, color:string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(rowCol.row * this.tileW + 1, rowCol.col * this.tileH + 1, this.tileW - 1, this.tileH - 1);
    }

    draw() {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                this.ctx.strokeStyle = "#666";
                if (this.grid[r][c] === 1) {
                    const rowCol:RowColCoords = {row:r, col:c, weight:0, previous:null, directCost: 0} 
                    this.fill(rowCol, "#fff");
                } 
            }            
        }
    }
}


export class Maze extends Grid {

    public start:RowColCoords;
    public finish:RowColCoords;
    public queue:PQueue<any>;
    public visited:Array<RowColCoords> = [];
    public inQueue:any = {};
    public done:boolean = false;

    constructor(rows:number, cols:number, canvas:HTMLCanvasElement) {
        super(rows, cols, canvas);
        this.queue = new PQueue((a:RowColCoords, b:RowColCoords) => a.weight + a.directCost < b.weight + b.directCost);
    }


    setStartFinish(s:Array<number>, f:Array<number>) {
        this.start  = {row: s[0], col: s[1], weight: 1, previous: null, directCost: 0};
        this.finish = {row: f[0], col: f[1], weight: 1, previous: null, directCost: 0};

        // in case the random wall fall on the start or finish
        this.grid[this.start.row][this.start.col] = 0;
        this.grid[this.finish.row][this.finish.col] = 0;
    }

    draw() {
        super.draw();
        this.fill(this.start, "rgb(192, 0, 0)");
        this.fill(this.finish, "rgb(149, 213, 102)");
    }


    isInQueue(rowCol:RowColCoords) {
        return this.inQueue[`${rowCol.row}-${rowCol.col}`]
    }

    walk(rowCol:RowColCoords) {
        const directCost = (this.finish.row - rowCol.row) + (this.finish.col - rowCol.col);

        let left  = { row: rowCol.row     , col: rowCol.col + 1, weight: rowCol.weight + 1, previous: rowCol, directCost: directCost};
        let right = { row: rowCol.row     , col: rowCol.col - 1, weight: rowCol.weight + 1, previous: rowCol, directCost: directCost};
        let up    = { row: rowCol.row - 1 , col: rowCol.col    , weight: rowCol.weight + 1, previous: rowCol, directCost: directCost};
        let down  = { row: rowCol.row + 1 , col: rowCol.col    , weight: rowCol.weight + 1, previous: rowCol, directCost: directCost};

        this.visited.push(rowCol);
        if (rowCol.row === this.finish.row && rowCol.col === this.finish.col) {
            this.done = true;
            return console.log("done");
        }

        if (this.visited.length) {
            let path = [];
            let current = this.visited[this.visited.length - 1];
            while(current.previous) {
                path.push(current);
                this.fill(current, "rgb(191, 239, 255");
                current = current.previous;
            }
            this.fill(rowCol, "rgb(114, 143, 153");
        }


        
        if (!this.isInQueue(down) && rowCol.row + 1 < this.rows && this.grid[down.row][down.col] !== 1) {
            this.queue.add(down)
            this.inQueue[`${rowCol.row + 1}-${rowCol.col}`] = true;
        }

        
        if (!this.isInQueue(up) && rowCol.row - 1 >= 0 && this.grid[up.row][up.col] !== 1) {
            this.queue.add(up)
            this.inQueue[`${rowCol.row - 1}-${rowCol.col}`] = true;
        }

        
        if (!this.isInQueue(left) && rowCol.col + 1 < this.cols && this.grid[left.row][left.col] !== 1) {
            this.queue.add(left)
            this.inQueue[`${rowCol.row}-${rowCol.col + 1}`] = true;
        }

        
        if (!this.isInQueue(right) && rowCol.col - 1 >= 0 && this.grid[right.row][right.col] !== 1) {
            this.queue.add(right)
            this.inQueue[`${rowCol.row}-${rowCol.col - 1}`] = true;
        }

        if (rowCol === this.start) {
            this.inQueue[`${rowCol.row}-${rowCol.col}`] = true;
        }
    }

}