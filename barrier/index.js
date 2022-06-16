export default class Barrier {
    #canvas;
    x;
    y;
    constructor(x, y){
        this.#canvas = document.createElement("canvas");    
        this.#canvas.width = 40;
        this.#canvas.height = 40;
        this.x = x;
        this.y = y;
        const ctx = this.#canvas.getContext("2d");
        ctx.strokeStyle = "white"; 
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
    
    getWidth(){
        return this.#canvas.width;
    }

    getHeight(){
        return this.#canvas.height;
    }

    getCanvas(){
        return this.#canvas;
    }
}

