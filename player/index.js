export default class Player{

    #canvas;
    #mouth = document.createElement("canvas");
    #mouthMove = -1.5; 
    #increment = true;
    direction = 0;
    #huong = [];

    constructor(x, y, color){
        this.#canvas = document.createElement("canvas");
        var ctx = this.#canvas.getContext("2d");
        this.#canvas.width = 40;
        this.#canvas.height = 40;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 0.25;
        ctx.fillStyle = this.color || "yellow";
        ctx.beginPath();
        ctx.arc(40 / 2, 40 / 2, 40 / 2, 0,  Math.PI * 2);
        ctx.fill();
    }

    #drawMouth(){
        var ctx = this.#mouth.getContext("2d");
        this.#mouth.width = 40;
        this.#mouth.height = 40;
        ctx.fillStyle = this.color || "yellow";
        ctx.beginPath();
        ctx.arc(
            40/2,
            40/2,
            40/2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(
            40/2, 
            40/2, 
            40/2, 
            Math.cos(this.#mouthMove) * -0.2 * Math.PI + (Math.PI * this.direction), 
            Math.cos(this.#mouthMove) * 0.2 * Math.PI + (Math.PI * this.direction),
        );
        ctx.lineTo(40/2, 40/2);
        ctx.closePath();
        ctx.fill();
        if(this.#increment){
            this.#mouthMove = Math.round((this.#mouthMove + 0.09) * 10) / 10;
        } else {
            this.#mouthMove = -1.5;
            this.#increment = true;
        }
        if(this.#mouthMove > 1.49){
            this.#increment = false;
        }
    }

    getCanvas(){
            this.#drawMouth();
            var ctx = this.#canvas.getContext("2d");
            ctx.drawImage(
                this.#mouth, 
                0,
                0,
                40, 
                40
            );
        return this.#canvas;
    }

    getWidth(){
        return this.#canvas.width;
    }

    getHeight(){
        return this.#canvas.height;
    }

    move(keys, map, particles){
        if(
            Number.isInteger(Math.round(this.x * 10) / 10) &&
            Number.isInteger(Math.round(this.y * 10) / 10)
        ){
            this.#huong = [...keys];
            var direction;
            if(this.#huong[65]){
                direction = "left";
            } else if (this.#huong[68]){
                direction = "right";
            } else if (this.#huong[83]){
                direction = "down";
            } else if (this.#huong[87]){
                direction = "up";
            }
            if(map.didCollideWithEnviroment(this.x, this.y, direction, particles)){
                return;
            }
        }
        if(this.#huong[65]){
            this.x -= this.speed;
            this.direction = Math.PI * 1.6; 
        } else if(this.#huong[68]){
            this.x += this.speed;
            this.direction = 0; 
        } else if (this.#huong[83]){
            this.y += this.speed;
            this.direction = Math.PI * 0.8; 
        } else if(this.#huong[87]){
            this.y -= this.speed;
            this.direction = Math.PI * 2.4; 
        }
    }
}
