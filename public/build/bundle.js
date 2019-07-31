(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install fastpriorityqueue

         Running test program (in JavaScript):

         // var FastPriorityQueue = require("fastpriorityqueue");// in node
         var x = new FastPriorityQueue();
         x.add(1);
         x.add(0);
         x.add(5);
         x.add(4);
         x.add(3);
         x.peek(); // should return 0, leaves x unchanged
         x.size; // should return 5, leaves x unchanged
         while(!x.isEmpty()) {
           console.log(x.poll());
         } // will print 0 1 3 4 5
         x.trim(); // (optional) optimizes memory usage
 */
'use strict';

var defaultcomparator = function(a, b) {
  return a < b;
};

// the provided comparator function should take a, b and return *true* when a < b
function FastPriorityQueue(comparator) {
  if (!(this instanceof FastPriorityQueue)) return new FastPriorityQueue(comparator);
  this.array = [];
  this.size = 0;
  this.compare = comparator || defaultcomparator;
}

// copy the priority queue into another, and return it. Queue items are shallow-copied.
// Runs in `O(n)` time.
FastPriorityQueue.prototype.clone = function() {
  var fpq = new FastPriorityQueue(this.compare);
  fpq.size = this.size;
  for (var i = 0; i < this.size; i++) {
    fpq.array.push(this.array[i]);
  }
  return fpq;
};

// Add an element into the queue
// runs in O(log n) time
FastPriorityQueue.prototype.add = function(myval) {
  var i = this.size;
  this.array[this.size] = myval;
  this.size += 1;
  var p;
  var ap;
  while (i > 0) {
    p = (i - 1) >> 1;
    ap = this.array[p];
    if (!this.compare(myval, ap)) {
      break;
    }
    this.array[i] = ap;
    i = p;
  }
  this.array[i] = myval;
};

// replace the content of the heap by provided array and "heapify it"
FastPriorityQueue.prototype.heapify = function(arr) {
  this.array = arr;
  this.size = arr.length;
  var i;
  for (i = this.size >> 1; i >= 0; i--) {
    this._percolateDown(i);
  }
};

// for internal use
FastPriorityQueue.prototype._percolateUp = function(i, force) {
  var myval = this.array[i];
  var p;
  var ap;
  while (i > 0) {
    p = (i - 1) >> 1;
    ap = this.array[p];
    // force will skip the compare
    if (!force && !this.compare(myval, ap)) {
      break;
    }
    this.array[i] = ap;
    i = p;
  }
  this.array[i] = myval;
};

// for internal use
FastPriorityQueue.prototype._percolateDown = function(i) {
  var size = this.size;
  var hsize = this.size >>> 1;
  var ai = this.array[i];
  var l;
  var r;
  var bestc;
  while (i < hsize) {
    l = (i << 1) + 1;
    r = l + 1;
    bestc = this.array[l];
    if (r < size) {
      if (this.compare(this.array[r], bestc)) {
        l = r;
        bestc = this.array[r];
      }
    }
    if (!this.compare(bestc, ai)) {
      break;
    }
    this.array[i] = bestc;
    i = l;
  }
  this.array[i] = ai;
};

// internal
// _removeAt(index) will remove the item at the given index from the queue,
// retaining balance. returns the removed item, or undefined if nothing is removed.
FastPriorityQueue.prototype._removeAt = function(index) {
  if (index > this.size - 1 || index < 0) return undefined;

  // impl1:
  //this.array.splice(index, 1);
  //this.heapify(this.array);
  // impl2:
  this._percolateUp(index, true);
  return this.poll();
};

// remove(myval) will remove an item matching the provided value from the
// queue, checked for equality by using the queue's comparator.
// return true if removed, false otherwise.
FastPriorityQueue.prototype.remove = function(myval) {
  for (var i = 0; i < this.size; i++) {
    if (!this.compare(this.array[i], myval) && !this.compare(myval, this.array[i])) {
      // items match, comparator returns false both ways, remove item
      this._removeAt(i);
      return true;
    }
  }
  return false;
};

// internal
// removes and returns items for which the callback returns true.
FastPriorityQueue.prototype._batchRemove = function(callback, limit) {
  // initialize return array with max size of the limit or current queue size
  var retArr = new Array(limit ? limit : this.size);
  var count = 0;

  if (typeof callback === 'function' && this.size) {
    var i = 0;
    while (i < this.size && count < retArr.length) {
      if (callback(this.array[i])) {
        retArr[count] = this._removeAt(i);
        count++;
        // move up a level in the heap if we remove an item
        i = i >> 1;
      } else {
        i++;
      }
    } 
  }
  retArr.length = count;
  return retArr;
}

// removeOne(callback) will execute the callback function for each item of the queue
// and will remove the first item for which the callback will return true.
// return the removed item, or undefined if nothing is removed.
FastPriorityQueue.prototype.removeOne = function(callback) {
  var arr = this._batchRemove(callback, 1);
  return arr.length > 0 ? arr[0] : undefined;
};

// remove(callback[, limit]) will execute the callback function for each item of
// the queue and will remove each item for which the callback returns true, up to
// a max limit of removed items if specified or no limit if unspecified.
// return an array containing the removed items.
FastPriorityQueue.prototype.removeMany = function(callback, limit) {
  return this._batchRemove(callback, limit);
};

// Look at the top of the queue (one of the smallest elements) without removing it
// executes in constant time
//
// Calling peek on an empty priority queue returns
// the "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
FastPriorityQueue.prototype.peek = function() {
  if (this.size == 0) return undefined;
  return this.array[0];
};

// remove the element on top of the heap (one of the smallest elements)
// runs in logarithmic time
//
// If the priority queue is empty, the function returns the
// "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
// For long-running and large priority queues, or priority queues
// storing large objects, you may  want to call the trim function
// at strategic times to recover allocated memory.
FastPriorityQueue.prototype.poll = function() {
  if (this.size == 0) return undefined;
  var ans = this.array[0];
  if (this.size > 1) {
    this.array[0] = this.array[--this.size];
    this._percolateDown(0);
  } else {
    this.size -= 1;
  }
  return ans;
};

// This function adds the provided value to the heap, while removing
// and returning one of the smallest elements (like poll). The size of the queue
// thus remains unchanged.
FastPriorityQueue.prototype.replaceTop = function(myval) {
  if (this.size == 0) return undefined;
  var ans = this.array[0];
  this.array[0] = myval;
  this._percolateDown(0);
  return ans;
};

// recover unused memory (for long-running priority queues)
FastPriorityQueue.prototype.trim = function() {
  this.array = this.array.slice(0, this.size);
};

// Check whether the heap is empty
FastPriorityQueue.prototype.isEmpty = function() {
  return this.size === 0;
};

// iterate over the items in order, pass a callback that receives (item, index) as args.
// TODO once we transpile, uncomment
// if (Symbol && Symbol.iterator) {
//   FastPriorityQueue.prototype[Symbol.iterator] = function*() {
//     if (this.isEmpty()) return;
//     var fpq = this.clone();
//     while (!fpq.isEmpty()) {
//       yield fpq.poll();
//     }
//   };
// }
FastPriorityQueue.prototype.forEach = function(callback) {
  if (this.isEmpty() || typeof callback != 'function') return;
  var i = 0;
  var fpq = this.clone();
  while (!fpq.isEmpty()) {
    callback(fpq.poll(), i++);
  }
};

// return the k 'smallest' elements of the queue
// runs in O(k log k) time
// this is the equivalent of repeatedly calling poll, but
// it has a better computational complexity, which can be
// important for large data sets.
FastPriorityQueue.prototype.kSmallest = function(k) {
  if (this.size == 0) return [];
  var comparator = this.compare;
  var arr = this.array
  var fpq = new FastPriorityQueue(function(a,b){
   return comparator(arr[a],arr[b]);
  });
  k = Math.min(this.size, k);
  var smallest = new Array(k);
  var j = 0;
  fpq.add(0);
  while (j < k) {
    var small = fpq.poll();
    smallest[j++] = this.array[small];
    var l = (small << 1) + 1;
    var r = l + 1;
    if (l < this.size) fpq.add(l);
    if (r < this.size) fpq.add(r);
  }
  return smallest;
}

// just for illustration purposes
var main = function() {
  // main code
  var x = new FastPriorityQueue(function(a, b) {
    return a < b;
  });
  x.add(1);
  x.add(0);
  x.add(5);
  x.add(4);
  x.add(3);
  while (!x.isEmpty()) {
    console.log(x.poll());
  }
};

if (require.main === module) {
  main();
}

module.exports = FastPriorityQueue;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("./grid");
var countFrames_1 = require("../countFrames");
var index_1 = require("../index");
var drawFrameCounter = require("../phyisics/helpers").drawFrameCounter;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frameCounter = new countFrames_1.CountFramesClass();
var maze;
var showQueue = false;
function setup() {
    canvas.style.backgroundColor = "#000";
    maze = new grid_1.Maze(50, 50, canvas);
    maze.setStartFinish([0, 0], [maze.rows - 1, maze.cols - 1]);
    maze.walk((maze.start), "astar");
}
function draw() {
    ctx.clearRect(0, canvas.height - 25, 75, 25);
    maze.draw();
    if (!maze.queue.isEmpty() && !maze.done) {
        var current = maze.queue.poll();
        maze.walk((current), "astar");
    }
    else {
        if (!maze.visited[maze.visited.length - 1].previous)
            return;
        var path = [];
        var current = maze.visited[maze.visited.length - 1].previous;
        while (current.previous) {
            path.push(current);
            maze.fill(current, "rgb(245, 139, 146");
            current = current.previous;
        }
        return console.log(path);
    }
    drawFrameCounter(frameCounter, ctx, canvas);
    var animation = requestAnimationFrame(draw);
    index_1.animations.add(animation);
}
function startAStart() {
    index_1.animations.clear(null);
    setup();
    draw();
}
exports.startAStart = startAStart;

},{"../countFrames":13,"../index":14,"../phyisics/helpers":17,"./grid":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("./grid");
var countFrames_1 = require("../countFrames");
var index_1 = require("../index");
var drawFrameCounter = require("../phyisics/helpers").drawFrameCounter;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frameCounter = new countFrames_1.CountFramesClass();
var maze;
var showQueue = false;
function setup() {
    canvas.style.backgroundColor = "#000";
    maze = new grid_1.Maze(50, 50, canvas);
    maze.setStartFinish([0, 0], [maze.rows - 1, maze.cols - 1]);
    maze.walk((maze.start), "bfs");
}
function draw() {
    ctx.clearRect(0, canvas.height - 25, 75, 25);
    maze.draw();
    if (!maze.queue.isEmpty() && !maze.done) {
        var current = maze.queue.poll();
        maze.walk((current), "bfs");
    }
    else {
        if (!maze.visited[maze.visited.length - 1].previous)
            return;
        var path = [];
        var current = maze.visited[maze.visited.length - 1].previous;
        while (current.previous) {
            path.push(current);
            maze.fill(current, "rgb(245, 139, 146");
            current = current.previous;
        }
        return console.log(path);
    }
    drawFrameCounter(frameCounter, ctx, canvas);
    var animation = requestAnimationFrame(draw);
    index_1.animations.add(animation);
}
function startBFS() {
    index_1.animations.clear(null);
    setup();
    draw();
}
exports.startBFS = startBFS;

},{"../countFrames":13,"../index":14,"../phyisics/helpers":17,"./grid":4}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastpriorityqueue_1 = __importDefault(require("fastpriorityqueue"));
var Grid = /** @class */ (function () {
    function Grid(rows, cols, canvas) {
        this.walls = 0.25;
        this.rows = rows;
        this.cols = cols;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.grid = [];
        this.tileW = this.canvas.width / this.rows;
        this.tileH = this.canvas.height / this.cols;
        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                if (!this.grid[r]) {
                    this.grid[r] = [];
                }
                var rndm = Math.random();
                rndm < this.walls ? this.grid[r][c] = 1 : this.grid[r][c] = 0;
            }
        }
    }
    Grid.prototype.fill = function (rowCol, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(rowCol.row * this.tileW + 1, rowCol.col * this.tileH + 1, this.tileW - 1, this.tileH - 1);
    };
    Grid.prototype.draw = function () {
        for (var r = 0; r < this.grid.length; r++) {
            for (var c = 0; c < this.grid[r].length; c++) {
                this.ctx.strokeStyle = "#666";
                if (this.grid[r][c] === 1) {
                    var rowCol = { row: r, col: c, weight: 0, previous: null, directCost: 0 };
                    this.fill(rowCol, "#fff");
                }
            }
        }
    };
    return Grid;
}());
exports.Grid = Grid;
var Maze = /** @class */ (function (_super) {
    __extends(Maze, _super);
    function Maze(rows, cols, canvas) {
        var _this = _super.call(this, rows, cols, canvas) || this;
        _this.visited = [];
        _this.inQueue = {};
        _this.done = false;
        _this.queue = new fastpriorityqueue_1.default(function (a, b) { return a.weight + a.directCost < b.weight + b.directCost; });
        return _this;
    }
    Maze.prototype.setStartFinish = function (s, f) {
        this.start = { row: s[0], col: s[1], weight: 1, previous: null, directCost: 0 };
        this.finish = { row: f[0], col: f[1], weight: 1, previous: null, directCost: 0 };
        // in case the random wall fall on the start or finish
        this.grid[this.start.row][this.start.col] = 0;
        this.grid[this.finish.row][this.finish.col] = 0;
    };
    Maze.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.fill(this.start, "rgb(192, 0, 0)");
        this.fill(this.finish, "rgb(149, 213, 102)");
    };
    Maze.prototype.isInQueue = function (rowCol) {
        return this.inQueue[rowCol.row + "-" + rowCol.col];
    };
    Maze.prototype.isAStar = function (str) {
        return str === "astar";
    };
    Maze.prototype.walk = function (rowCol, algorithn) {
        var directCost = (this.finish.row - rowCol.row) + (this.finish.col - rowCol.col);
        var calculatedDirectCost = this.isAStar(algorithn) ? directCost : 0; // only calc path cost is algo is astar
        var left = { row: rowCol.row, col: rowCol.col + 1, weight: rowCol.weight + 1, previous: rowCol, directCost: calculatedDirectCost };
        var right = { row: rowCol.row, col: rowCol.col - 1, weight: rowCol.weight + 1, previous: rowCol, directCost: calculatedDirectCost };
        var up = { row: rowCol.row - 1, col: rowCol.col, weight: rowCol.weight + 1, previous: rowCol, directCost: calculatedDirectCost };
        var down = { row: rowCol.row + 1, col: rowCol.col, weight: rowCol.weight + 1, previous: rowCol, directCost: calculatedDirectCost };
        this.visited.push(rowCol);
        if (rowCol.row === this.finish.row && rowCol.col === this.finish.col) {
            this.done = true;
            return console.log("done");
        }
        this.fill(rowCol, "rgb(114, 143, 153");
        if (!this.isInQueue(down) && rowCol.row + 1 < this.rows && this.grid[down.row][down.col] !== 1) {
            this.queue.add(down);
            this.inQueue[rowCol.row + 1 + "-" + rowCol.col] = true;
            this.fill(down, "rgb(191, 239, 255");
        }
        if (!this.isInQueue(up) && rowCol.row - 1 >= 0 && this.grid[up.row][up.col] !== 1) {
            this.queue.add(up);
            this.inQueue[rowCol.row - 1 + "-" + rowCol.col] = true;
            this.fill(up, "rgb(191, 239, 255");
        }
        if (!this.isInQueue(left) && rowCol.col + 1 < this.cols && this.grid[left.row][left.col] !== 1) {
            this.queue.add(left);
            this.inQueue[rowCol.row + "-" + (rowCol.col + 1)] = true;
            this.fill(left, "rgb(191, 239, 255");
        }
        if (!this.isInQueue(right) && rowCol.col - 1 >= 0 && this.grid[right.row][right.col] !== 1) {
            this.queue.add(right);
            this.inQueue[rowCol.row + "-" + (rowCol.col - 1)] = true;
            this.fill(right, "rgb(191, 239, 255");
        }
        if (rowCol === this.start) {
            this.inQueue[rowCol.row + "-" + rowCol.col] = true;
        }
    };
    return Maze;
}(Grid));
exports.Maze = Maze;

},{"fastpriorityqueue":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var canvas = document.getElementById("canvas");
var DNA = /** @class */ (function () {
    function DNA(dnaLen, dna) {
        this.genes = [];
        if (dna && dna.length) {
            this.genes = dna;
        }
        else {
            for (var idx = 0; idx < dnaLen; idx++) {
                this.genes[idx] = vector_1.VectorClass.randomVector(canvas.width, canvas.height);
                this.genes[idx].setMag(0.1);
            }
        }
    }
    DNA.prototype.crossOver = function (partner) {
        var newGenes = [];
        var mid = Math.floor(Math.random() * this.genes.length);
        for (var idx = 0; idx < this.genes.length; idx++) {
            if (idx > mid) {
                newGenes[idx] = this.genes[idx];
            }
            else {
                newGenes[idx] = partner.genes[idx];
            }
        }
        return newGenes;
    };
    return DNA;
}());
exports.DNA = DNA;

},{"../vector":19}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countFrames_1 = require("../countFrames");
var vector_1 = require("../vector");
var index_1 = require("../index");
var Population = require("./population").Population;
var drawFrameCounter = require("../phyisics/helpers").drawFrameCounter;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var framesPerMinute;
var lifeSpan = 400;
var target = new vector_1.VectorClass(canvas.width / 2, 50);
var framesCounter = 0;
var rockets;
function rocketSetup() {
    framesCounter = 0;
    rockets = new Population(100, lifeSpan, canvas);
    canvas.style.backgroundColor = "#000";
    framesPerMinute = new countFrames_1.CountFramesClass();
}
function drawTarget() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(target.x, target.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawRocket(rocket) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    rocket.applyForce(rocket.dna.genes[framesCounter]);
    rocket.bounderyCheck(target);
    rocket.move();
    ctx.arc(rocket.pos.x, rocket.pos.y, rocket.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawRockets(rockets) {
    if (framesCounter >= lifeSpan) {
        rockets.evaluate(target);
        rockets.evolve();
        framesCounter = 0;
        return;
    }
    for (var _i = 0, _a = rockets.population; _i < _a.length; _i++) {
        var rocket = _a[_i];
        if (!rocket.crashed && !rocket.complete) {
            drawRocket(rocket);
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRockets(rockets);
    drawTarget();
    framesCounter++;
    drawFrameCounter(framesPerMinute, ctx, canvas);
    var animationId = requestAnimationFrame(draw);
    index_1.animations.add(animationId);
}
function startRocket() {
    index_1.animations.clear(null);
    rocketSetup();
    draw();
}
exports.startRocket = startRocket;

},{"../countFrames":13,"../index":14,"../phyisics/helpers":17,"../vector":19,"./population":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rocket_1 = require("./rocket");
var canvas = document.getElementById("canvas");
var Population = /** @class */ (function () {
    function Population(numOfPopulation, dnaLen) {
        this.population = [];
        for (var idx = 0; idx < numOfPopulation; idx++) {
            this.population[idx] = new rocket_1.Rocket(dnaLen, []);
        }
    }
    // pick a parent based on its score
    Population.prototype.pickOne = function () {
        var random = Math.random();
        var idx = 0;
        while (random > 0) {
            random -= this.population[idx].fitness;
            idx++;
        }
        idx--;
        return this.population[idx];
    };
    Population.prototype.evaluate = function (target) {
        var maxFitness = 0;
        this.population.forEach(function (citizen) {
            citizen.calcFitness(target);
            if (citizen.fitness > maxFitness) {
                maxFitness = citizen.fitness;
            }
        });
        // normalizing fitness between 0-1
        this.population.forEach(function (citizen) {
            return citizen.fitness = citizen.fitness / maxFitness;
        });
    };
    Population.prototype.evolve = function () {
        var newPopulation = [];
        for (var idx = 0; idx < this.population.length; idx++) {
            var parentA = this.pickOne();
            var parentB = this.pickOne();
            var newDna = parentA.dna.crossOver(parentB.dna);
            var child = new rocket_1.Rocket(newDna.length, newDna);
            child.mutate();
            newPopulation.push(child);
        }
        this.population = newPopulation;
    };
    return Population;
}());
exports.Population = Population;

},{"./rocket":8}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../ball");
var vector_1 = require("../vector");
var DNA_1 = require("./DNA");
var canvas = document.getElementById("canvas");
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket(dnaLen, dna) {
        if (dna === void 0) { dna = []; }
        var _this = _super.call(this) || this;
        _this.dna = new DNA_1.DNA(dnaLen, dna);
        _this.dnaLen = dnaLen;
        _this.pos = new vector_1.VectorClass(canvas.width / 2, canvas.height - 20);
        _this.fitness = 0;
        _this.complete = false;
        _this.crashed = false;
        return _this;
    }
    Rocket.prototype.bounderyCheck = function (target) {
        var distance = vector_1.VectorClass.sub(this.pos, target);
        var distanceMagnitude = distance.mag();
        if (this.pos.x >= canvas.width) {
            this.crashed = true;
        }
        else if (this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y >= canvas.height - this.radius / 2) {
            this.crashed = true;
        }
        else if (this.pos.y < 0) {
            this.crashed = true;
        }
        if (distanceMagnitude < 10) {
            this.complete = true;
        }
    };
    Rocket.prototype.calcFitness = function (target) {
        var distance = vector_1.VectorClass.sub(this.pos, target);
        var magnitude = distance.mag();
        this.fitness = 1 / magnitude;
        if (this.complete) {
            this.fitness *= 10;
        }
    };
    Rocket.prototype.mutate = function () {
        var random = Math.random();
        if (random <= 0.01) {
            var randomIdx = Math.floor(Math.random() * this.dnaLen);
            var randomVector = vector_1.VectorClass.randomVector(canvas.width, canvas.height);
            randomVector.setMag(0.1);
            this.dna.genes[randomIdx] = randomVector;
        }
    };
    return Rocket;
}(ball_1.BallClass));
exports.Rocket = Rocket;

},{"../ball":12,"../vector":19,"./DNA":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../ball");
var vehicle_1 = require("./vehicle");
var index_1 = require("../index");
var canvas = document.getElementById("canvas");
var foods = createObjects(50);
var poisons = createObjects(10);
var mousePos = { x: 0, y: 0 };
var ctx = canvas.getContext("2d");
var vehicle = new vehicle_1.Vehicle();
function createObjects(numOfObjects) {
    var holder = [];
    for (var idx = 0; idx < numOfObjects; idx++) {
        var defaultConfig = {
            acc: { x: 0, y: 0 },
            pos: { x: Math.floor(Math.random() * canvas.width),
                y: Math.floor(Math.random() * canvas.height) },
            velocity: { x: 0, y: 0 },
            mass: 1
        };
        var obj = new ball_1.BallClass(defaultConfig);
        holder.push(obj);
    }
    return holder;
}
function showObjects(arr, color) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var obj = arr_1[_i];
        drawShape(obj.pos, color, 2);
    }
}
function setup() {
    canvas.style.backgroundColor = "black";
}
function getMousePos(canvas, e) {
    /// getBoundingClientRect is supported in most browsers and gives you
    /// the absolute geometry of an element
    var rect = canvas.getBoundingClientRect();
    /// as mouse event coords are relative to document you need to
    /// subtract the element's left and top position:
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
function drawShape(position, color, size) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawMe(vector, color, size) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(vector.pos.x, vector.pos.y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMe(vehicle, "blue", 8);
    showObjects(foods, "green");
    showObjects(poisons, "red");
    vehicle.seek(foods, "food");
    vehicle.seek(poisons, "poison");
    vehicle.bounderies();
    vehicle.move();
    var animationId = requestAnimationFrame(draw);
    index_1.animations.add(animationId);
}
function startAdvencedSteering() {
    index_1.animations.clear(null);
    setup();
    draw();
}
exports.startAdvencedSteering = startAdvencedSteering;

},{"../ball":12,"../index":14,"./vehicle":10}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../ball");
var vector_1 = require("../vector");
var canvas = document.getElementById("canvas");
var Vehicle = /** @class */ (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxSpeed = 1;
        _this.maxSteer = 0.2;
        _this.steer = new vector_1.VectorClass();
        _this.closestEl = new vector_1.VectorClass();
        _this.foodSight = 100;
        _this.poisonSight = 16;
        return _this;
    }
    Vehicle.prototype.bounderies = function () {
        var target;
        if (this.pos.x > canvas.width || this.pos.x < 0) {
            if (this.velocity.x > 0 && this.velocity.y > 0) {
                target = new vector_1.VectorClass(canvas.width / 2, canvas.height);
            }
            else if (this.velocity.x > 0 && this.velocity.y < 0) {
                target = new vector_1.VectorClass(canvas.width / 2, 0);
            }
            else if (this.velocity.x < 0 && this.velocity.y > 0) {
                target = new vector_1.VectorClass(canvas.width / 2, canvas.height);
            }
            else if (this.velocity.x < 0 && this.velocity.y < 0) {
                target = new vector_1.VectorClass(canvas.width / 2, 0);
            }
            var desire = vector_1.VectorClass.sub(target, this.pos);
            desire.setMag(this.maxSpeed);
            var steer = vector_1.VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);
            this.applyForce(steer);
        }
        if (this.pos.y > canvas.height || this.pos.y < 0) {
            if (this.velocity.x > 0 && this.velocity.y > 0) {
                target = new vector_1.VectorClass(canvas.width, canvas.height / 2);
            }
            else if (this.velocity.x > 0 && this.velocity.y < 0) {
                target = new vector_1.VectorClass(canvas.width / 2, 0);
            }
            else if (this.velocity.x < 0 && this.velocity.y > 0) {
                target = new vector_1.VectorClass(0, canvas.height / 2);
            }
            else if (this.velocity.x < 0 && this.velocity.y < 0) {
                target = new vector_1.VectorClass(0, canvas.height / 2);
            }
            var desire = vector_1.VectorClass.sub(target, this.pos);
            desire.setMag(this.maxSpeed);
            var steer = vector_1.VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);
            this.applyForce(steer);
        }
    };
    Vehicle.prototype.seek = function (targetArr, targetName) {
        var closestDist = Infinity;
        var closestIdx = -1;
        var closestEl = null;
        if (!targetArr.length) {
            return;
        }
        var sight = targetName === "poison" ? this.poisonSight : this.foodSight;
        for (var idx = targetArr.length - 1; idx >= 0; idx--) {
            var target = targetArr[idx];
            var dist = this.pos.dist(target.pos);
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
            var maxSpeed = targetName !== "poison" ? this.maxSpeed : -(this.maxSpeed * 0.7);
            var desire = vector_1.VectorClass.sub(closestEl.pos, this.pos);
            desire.setMag(maxSpeed);
            var steer = vector_1.VectorClass.sub(desire, this.velocity);
            steer.setMag(this.maxSteer);
            this.steer = steer;
            this.applyForce(steer);
        }
    };
    return Vehicle;
}(ball_1.BallClass));
exports.Vehicle = Vehicle;

},{"../ball":12,"../vector":19}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var Animations = /** @class */ (function () {
    function Animations() {
        this.animations = [];
    }
    Animations.prototype.add = function (id) { this.animations.push(id); };
    Animations.prototype.clear = function (id) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (id) {
            this.animations = this.animations.filter(function (i) { return i !== id; });
            return cancelAnimationFrame(id);
        }
        this.animations.forEach(function (i) { return cancelAnimationFrame(i); });
    };
    return Animations;
}());
exports.Animations = Animations;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var defaultConfig = {
    acc: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    mass: 1
};
var BallClass = /** @class */ (function () {
    function BallClass(config) {
        if (config === void 0) { config = defaultConfig; }
        this.acc = new vector_1.VectorClass(config.acc.x, config.acc.y);
        this.velocity = new vector_1.VectorClass(config.velocity.x, config.velocity.y);
        this.mass = config.mass;
        this.pos = new vector_1.VectorClass(config.pos.x, config.pos.y);
        this.radius = this.mass * 5;
    }
    BallClass.prototype.move = function () {
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);
        this.acc.mult(0);
    };
    BallClass.prototype.limitVelocity = function (num) {
        this.velocity.max(num);
    };
    BallClass.prototype.applyForce = function (force) {
        // nyuton second law
        // accelaration = force / mass;
        var f = vector_1.VectorClass.div(force, this.mass);
        this.acc.add(f);
    };
    return BallClass;
}());
exports.BallClass = BallClass;

},{"./vector":19}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CountFramesClass = /** @class */ (function () {
    function CountFramesClass() {
        this.frames = 1;
        this.lastSecondFrames = 0;
        this.lastTime = Math.ceil(new Date().getTime() / 1000);
    }
    CountFramesClass.prototype.add = function () {
        var now = Math.ceil(new Date().getTime() / 1000);
        if (now !== this.lastTime) {
            this.lastSecondFrames = this.frames;
            this.reset();
            this.lastTime = now;
        }
        else {
            this.frames++;
        }
    };
    CountFramesClass.prototype.reset = function () { this.frames = 1; };
    return CountFramesClass;
}());
exports.CountFramesClass = CountFramesClass;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("./animations");
exports.animations = new animations_1.Animations();
var startBouncing = require("./phyisics/bouncing").startBouncing;
var startOrbit = require("./phyisics/orbiting").startOrbit;
var startGello = require("./phyisics/gello").startGello;
var startRocket = require("./SmartRockets/index").startRocket;
var startAdvencedSteering = require("./Steering/index").startAdvencedSteering;
var startAStart = require("./Graphs/astar").startAStart;
var startBFS = require("./Graphs/bfs").startBFS;
var bouncingBtn = document.querySelector("#bouncing-btn");
var orbitingBtn = document.querySelector("#orbiting-btn");
var gelloBtn = document.querySelector("#gello-btn");
var rocketBtn = document.querySelector("#rocket-btn");
var steeringAdvencedBtn = document.querySelector("#steering-advenced-btn");
var AStarBtn = document.querySelector("#a-star-btn");
var bfsBtn = document.querySelector("#bfs-btn");
bouncingBtn.addEventListener("click", startBouncing);
orbitingBtn.addEventListener("click", startOrbit);
gelloBtn.addEventListener("click", startGello);
rocketBtn.addEventListener("click", startRocket);
steeringAdvencedBtn.addEventListener("click", startAdvencedSteering);
AStarBtn.addEventListener("click", startAStart);
bfsBtn.addEventListener("click", startBFS);

},{"./Graphs/astar":2,"./Graphs/bfs":3,"./SmartRockets/index":6,"./Steering/index":9,"./animations":11,"./phyisics/bouncing":15,"./phyisics/gello":16,"./phyisics/orbiting":18}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var countFrames_1 = require("../countFrames");
var index_1 = require("../index");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var _a = require("../phyisics/helpers"), createBalls = _a.createBalls, drawBalls = _a.drawBalls, bounderyCheck = _a.bounderyCheck, drawFrameCounter = _a.drawFrameCounter;
var balls = [];
var animationId;
var framesCounter;
function setupBouncing() {
    balls = [];
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#000";
    framesCounter = new countFrames_1.CountFramesClass();
    balls = createBalls(5, canvas);
}
function drawBall(item, color) {
    var drag;
    var gravity;
    var wind;
    gravity = new vector_1.VectorClass(0, 0.7);
    wind = new vector_1.VectorClass(0, 0);
    gravity.mult(item.mass); // allow us to get the same gravity force no matter the mass
    drag = item.velocity.get();
    var speed = item.velocity.mag();
    drag.normalize();
    drag.mult(speed * speed * -0.001);
    item.applyForce(drag);
    item.applyForce(gravity);
    item.applyForce(wind);
    item.move();
    bounderyCheck(item, canvas);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawBouncing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls(balls, "red", function (ball, color) { return drawBall(ball, color); });
    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawBouncing);
    index_1.animations.add(animationId);
}
function startBouncing() {
    index_1.animations.clear(null);
    setupBouncing();
    drawBouncing();
}
exports.startBouncing = startBouncing;

},{"../countFrames":13,"../index":14,"../phyisics/helpers":17,"../vector":19}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var countFrames_1 = require("../countFrames");
var index_1 = require("../index");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var _a = require("../phyisics/helpers"), createBalls = _a.createBalls, drawBalls = _a.drawBalls, bounderyCheck = _a.bounderyCheck, drawFrameCounter = _a.drawFrameCounter;
var animationId;
var framesCounter;
var balls = [];
function setupGello() {
    balls = []; // clearing balls
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#000";
    framesCounter = new countFrames_1.CountFramesClass();
    balls = createBalls(5, canvas);
}
function drawRect(x, y, width, height, color) {
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
}
function isInsideGello(x, y) {
    return y > canvas.height / 2;
}
function drawBall(item, color) {
    var drag;
    var gravity;
    gravity = new vector_1.VectorClass(0, 0.3);
    gravity.mult(item.mass); // allow us to get the same gravity force no matter the mass
    drag = item.velocity.get();
    drag.normalize();
    var speed = item.velocity.mag();
    if (isInsideGello(item.pos.x, item.pos.y)) {
        drag.mult(speed * speed * -0.125); // gello drag
    }
    else {
        drag.mult(speed * speed * -0.001); // air drag
    }
    item.applyForce(drag);
    item.applyForce(gravity);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    bounderyCheck(item, canvas);
    item.move();
}
function drawGello() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(0, canvas.height / 2, canvas.width, canvas.height / 2, "lightgrey");
    drawBalls(balls, "red", function (ball, color) { return drawBall(ball, color); });
    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawGello);
    index_1.animations.add(animationId);
}
function startGello() {
    index_1.animations.clear(null);
    setupGello();
    drawGello();
}
exports.startGello = startGello;

},{"../countFrames":13,"../index":14,"../phyisics/helpers":17,"../vector":19}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../ball");
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNumber = randomNumber;
function drawBalls(balls, color, cb) {
    for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
        var ball = balls_1[_i];
        cb(ball, color);
    }
}
exports.drawBalls = drawBalls;
function drawFrameCounter(framesCounter, ctx, canvas) {
    framesCounter.add();
    ctx.beginPath();
    ctx.font = "14px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("FPS:" + framesCounter.lastSecondFrames, 10, canvas.height - 10);
    ctx.closePath();
}
exports.drawFrameCounter = drawFrameCounter;
function createBalls(numOfBalls, canvas) {
    var balls = [];
    var ball;
    for (var idx = 0; idx < numOfBalls; idx++) {
        var ballConfig = void 0;
        ballConfig = {
            acc: { x: 0, y: 0 },
            pos: { x: (canvas.width / numOfBalls) / 2 + idx * (canvas.width / numOfBalls), y: 0 },
            velocity: { x: 0, y: 0 },
            mass: randomNumber(1, 5)
        };
        ball = new ball_1.BallClass(ballConfig);
        balls.push(ball);
    }
    return balls;
}
exports.createBalls = createBalls;
function bounderyCheck(ball, canvas) {
    if (ball.pos.x >= canvas.width) {
        ball.velocity.x *= -1;
        ball.pos.x = canvas.width;
    }
    else if (ball.pos.x < 0) {
        ball.velocity.x *= -1;
        ball.pos.x = 0;
    }
    if (ball.pos.y >= canvas.height - ball.radius / 2) {
        ball.velocity.y *= -1;
        ball.pos.y = canvas.height - ball.radius / 2;
    }
    else if (ball.pos.y < 0) {
        ball.velocity.y *= -1;
        ball.pos.y = 0;
    }
}
exports.bounderyCheck = bounderyCheck;

},{"../ball":12}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var countFrames_1 = require("../countFrames");
var ball_1 = require("../ball");
var index_1 = require("../index");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var _a = require("../phyisics/helpers"), bounderyCheck = _a.bounderyCheck, drawFrameCounter = _a.drawFrameCounter;
var animationId;
var framesCounter;
var gravity;
gravity = new vector_1.VectorClass();
var attractor;
var attractorConfig;
var attracted;
var attractedConfig;
function setupOrbit() {
    cancelAnimationFrame(animationId);
    canvas.style.backgroundColor = "#000";
    framesCounter = new countFrames_1.CountFramesClass();
    attractorConfig = {
        acc: { x: 0, y: 0 },
        pos: { x: canvas.width / 2, y: canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        mass: 2
    };
    attractedConfig = {
        acc: { x: 0, y: 0 },
        pos: { x: canvas.width / 2, y: canvas.height / 4 },
        velocity: { x: 1.75, y: 0 },
        mass: 1
    };
    attracted = new ball_1.BallClass(attractedConfig);
    attractor = new ball_1.BallClass(attractorConfig);
}
function drawItem(item, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(item.pos.x, item.pos.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawOrbit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawItem(attractor, "red");
    drawItem(attracted, "blue");
    var attractorForce = vector_1.VectorClass.sub(attractor.pos, attracted.pos);
    var distance;
    // limiting the dstance
    var attractorForceMag = attractorForce.mag();
    if (attractorForceMag > 25) {
        distance = 25;
    }
    else if (attractorForceMag < 5) {
        distance = 5;
    }
    attractorForce.normalize();
    var c = 10;
    var gravityForce = ((c * attractor.mass * attracted.mass) / (distance * distance));
    attractorForce.mult(gravityForce);
    attracted.applyForce(attractorForce);
    attractor.move();
    attracted.move();
    bounderyCheck(attractor, canvas);
    bounderyCheck(attracted, canvas);
    drawFrameCounter(framesCounter, ctx, canvas);
    animationId = requestAnimationFrame(drawOrbit);
    index_1.animations.add(animationId);
}
function startOrbit() {
    index_1.animations.clear(null);
    setupOrbit();
    drawOrbit();
}
exports.startOrbit = startOrbit;

},{"../ball":12,"../countFrames":13,"../index":14,"../phyisics/helpers":17,"../vector":19}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNumber = randomNumber;
var VectorClass = /** @class */ (function () {
    function VectorClass(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    VectorClass.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };
    VectorClass.prototype.angle = function (vector) {
        var mag = this.mag();
        var vectorMag = vector.mag();
        return Math.cos((this.x * vector.x + this.y * vector.y) / mag * vectorMag);
    };
    VectorClass.prototype.sub = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };
    VectorClass.sub = function (vectorA, vectorB) {
        return new VectorClass(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    };
    VectorClass.prototype.mult = function (multBy) {
        this.x *= multBy;
        this.y *= multBy;
        return this;
    };
    VectorClass.prototype.div = function (divBydivBy) {
        this.x /= divBydivBy;
        this.y /= divBydivBy;
        return this;
    };
    VectorClass.div = function (vector, divBy) {
        return new VectorClass(vector.x / divBy, vector.y / divBy);
    };
    VectorClass.prototype.mag = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    VectorClass.prototype.setMag = function (num) {
        this.normalize();
        this.mult(num);
    };
    VectorClass.prototype.normalize = function () {
        var mag = this.mag();
        this.x = mag === 0 ? 0 : this.x / mag;
        this.y = mag === 0 ? 0 : this.y / mag;
        return this;
    };
    VectorClass.prototype.max = function (val) {
        if (Math.abs(this.x) > val) {
            this.x = this.x < 0 ? -1 * val : val;
        }
        if (Math.abs(this.y) > val) {
            this.y = this.y < 0 ? -1 * val : val;
        }
    };
    VectorClass.prototype.dist = function (vector) {
        var dist = VectorClass.sub(vector, this);
        var distLen = dist.mag();
        return distLen;
    };
    VectorClass.randomVector = function (canvasWidth, canvasHight) {
        var x = Math.floor(randomNumber(-canvasWidth, canvasWidth));
        var y = Math.floor(randomNumber(-canvasHight, canvasHight));
        return new VectorClass(x, y);
    };
    VectorClass.prototype.get = function () {
        return new VectorClass(this.x, this.y);
    };
    return VectorClass;
}());
exports.VectorClass = VectorClass;

},{}]},{},[14]);
