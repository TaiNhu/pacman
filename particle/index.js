export default class Particle{

    #canvas = document.createElement("canvas");
    x = 0;
    y = 0;

    constructor(x, y){
        var ctx = this.#canvas.getContext("2d"); 
        this.#canvas.width = 10;
        this.#canvas.height = 10;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(5, 5, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        this.x = x;
        this.y = y;
    }

    getCanvas(){
        return this.#canvas;
    }

    getWidth(){
        return this.#canvas.width;
    }

    getHeight() {
        return this.#canvas.height;
    }
}
