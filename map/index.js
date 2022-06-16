import Barrier from "@/Barrier";
import Enemy from "@/enemy";
import Particle from "@/particle";

export default class Map {

    #canvas;
    barriers = [];
    particles = [];
    enemys = [];
    map = [
        [
            [true, true, true, true, true, true, true, true],
            [true, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, true],
            [true, true, true, true, true, true, true, true]
        ], 
        [
            [1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,0,0,1],
            [1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1],
        ]
    ];

    constructor(){
        this.#canvas = document.createElement("canvas");
        this.#canvas.width = 40 * this.map[1][0].length;
        this.#canvas.height = 40 * this.map[1].length;
        this.score = 0;
    }

    getCanvas(lv){
        if (lv == 1){
            this.loadLv(1);
        }
        return this.#canvas;
    }

    addChild(child, x, y){
        this.#canvas.getContext("2d").drawImage(child.getCanvas(), x * 40, y * 40, child.getWidth(), child.getHeight()); 
        return this.#canvas;
    }

    loadLv(lv){
        this.barriers = [];
        this.particles = [];
        this.enemys = [];
        const canvas = {
            getCanvas: () => document.createElement("canvas"),
            getWidth: () => 100,
            getHeight: () => 30
        };
        const ctx = canvas.getCanvas().getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = "30px Arial"; 
        ctx.fillText(`Score: ${this.score}`, 0, 0);
        this.addChild(canvas, 0.5, 0.5);
        this.map[lv].forEach((column, y) => {
            column.forEach((row, x) => {
                if(row == 1){
                    this.barriers.push(new Barrier(x, y));
                    this.addChild(this.barriers[this.barriers.length - 1], x, y);
                } else if (row == 0){
                    this.particles.push(new Particle(x, y));
                    this.addChild(this.particles[this.particles.length - 1], x + 0.5, y + 0.5);
                } else if (row == 2){
                    this.enemys.push(new Enemy(x, y));
                    this.addChild(this.enemys[this.enemys.length - 1], x, y);
                }
            });
        });
        return this.#canvas;
    }

    rerenderParticles(){
        const ctx = this.#canvas.getContext("2d");
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
        var barrierIndex = 0;
        var particleIndex = 0;
        var enemysIndex = 0;
        this.map[1].forEach((column, y) => {
            column.forEach((row, x) => {
                if(row == 1){
                    this.addChild(this.barriers[barrierIndex], x, y);
                    barrierIndex++;
                } else if (row == 0){
                    if(this.particles[particleIndex]?.x === x && this.particles[particleIndex]?.y === y){
                        this.addChild(this.particles[particleIndex], x + 0.5, y + 0.5);
                        particleIndex++;
                    }
                } else if (row == 2){
                    this.addChild(this.enemys[enemysIndex], x, y);
                    enemysIndex++;
                }
            });
        });
    }

    getWidth(){
        return this.#canvas.width;
    }

    getHeight(){
        return this.#canvas.height;
    }

    didCollideWithEnviroment(x, y, direction, particles){
        if(
            Number.isInteger(Math.round(x * 10) / 10) &&
            Number.isInteger(Math.round(x * 10) / 10)
        ){
            var column = 0;
            var row = 0;
            var nextColumn = 0;
            var nextRow = 0;
            switch (direction){
                case "right":
                    nextColumn = x * 40 + 40;
                    column = nextColumn / 40;
                    row = y;
                    break;
                case "left":
                    nextColumn = x * 40 - 40;
                    column = nextColumn / 40;
                    row = y;
                    break;
                case "up":
                    nextRow = y * 40 - 40;
                    row = nextRow / 40;
                    column = x;
                    break;
                case "down":
                    nextRow = y * 40 + 40;
                    row = nextRow / 40;
                    column = x;
                    break;
            }
            const tile = this.map[1][row][column];
            if(tile === 1){
                return true;
            } else if (tile === 0){
                var index = particles.findIndex(value => value?.x === x && value?.y === y);
                if(index > -1){
                    particles.splice(index, 1);
                    this.score++;
                    this.rerenderParticles();
                }
            }
        }
    }
}
