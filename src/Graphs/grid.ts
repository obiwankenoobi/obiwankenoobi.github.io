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
    public grid: number[][];
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
        this.ctx.fillRect(rowCol.row * this.tileW, rowCol.col * this.tileH, this.tileW, this.tileH);
    }

    draw() {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                this.ctx.strokeStyle = "#666";
                if (this.grid[r][c] === 1) {
                    const rowCol:RowColCoords = {row:r, col:c, weight:0, previous:null, directCost: 0} 
                    this.fill(rowCol, "#666");
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
    public stack: Array<RowColCoords> = [];
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

    isAStar(str:string) {
        return str === "astar";
    }

    checkNeighbors(rowCol:RowColCoords, cb:Function, calculatedDirectCost: number) {
        for (let r = rowCol.row - 1; r <= rowCol.row + 1; r++) {
            for (let c = rowCol.col - 1; c <= rowCol.col + 1; c++) {
                if (!(r !== rowCol.row && c !== rowCol.col)) {

                    const current = { 
                        row: r, col: c, 
                        weight: rowCol.weight + 1, 
                        previous: rowCol, 
                        directCost: calculatedDirectCost ? calculatedDirectCost : 0
                    };

                    if (this.grid[r]             && 
                        this.grid[r][c] === 0    && 
                        !this.isInQueue(current)) {
                            cb(r, c, current);
                    } 
                }
            }
        }
    }

    addToQueue(r:number, c:number, current:RowColCoords) {
        this.queue.add(current)
        this.inQueue[`${r}-${c}`] = true;
        this.fill(current, "rgb(191, 239, 255");
    } 

    addToStack(r:number, c:number, current:RowColCoords) {
        this.stack.unshift(current);
        this.inQueue[`${r}-${c}`] = true;
        this.fill(current, "rgb(191, 239, 255");
    }

    walk(rowCol:RowColCoords, algorithn:string) {
        const directCost = (this.finish.row - rowCol.row) + (this.finish.col - rowCol.col);
        const calculatedDirectCost = this.isAStar(algorithn) ? directCost : 0; // only calc path cost is algo is astar

        this.visited.push(rowCol);

        if (rowCol.row === this.finish.row && rowCol.col === this.finish.col) {
            this.done = true;
            return console.log("done");
        }

        this.fill(rowCol, "rgb(114, 143, 153");
        
        // traversing th naighbors
        this.checkNeighbors(rowCol, this.addToQueue.bind(this), calculatedDirectCost);

        if (rowCol === this.start) 
            this.inQueue[`${rowCol.row}-${rowCol.col}`] = true;
        
    }



    dfs(rowCol:RowColCoords) {
        this.visited.push(rowCol);

        if (rowCol.row === this.finish.row && rowCol.col === this.finish.col) {
            this.done = true;
            return console.log("done");
        }

        this.fill(rowCol, "rgb(114, 143, 153");

        // traversing th naighbors
        this.checkNeighbors(rowCol, this.addToStack.bind(this), null);

        if (rowCol === this.start) 
            this.inQueue[`${rowCol.row}-${rowCol.col}`] = true;
        

    }
}