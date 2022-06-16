import Player from "@/player";

class Enemy extends Player {

    constructor(x, y){
        super(x, y, "red");
    }

    move(map, particles){
        if(
            Number.isInteger(Math.round(this.x * 10) / 10) &&
            Number.isInteger(Math.round(this.y * 10) / 10)
        ){
            var random = Math.round(Math.random() * 3);
            var direction;
            if(random == 0){
                direction = "left";
            } else if (random == 1){
                direction = "right";
            } else if (random == 2){
                direction = "down";
            } else if (random == 3){
                direction = "up";
            }
            if(map.didCollideWithEnviroment(this.x, this.y, direction, particles)){
                return;
            }
        }
        if(random == 0 ){
            this.x -= this.speed;
            this.direction = Math.PI * 1.6; 
        } else if(random == 1){
            this.x += this.speed;
            this.direction = 0; 
        } else if (random == 2){
            this.y += this.speed;
            this.direction = Math.PI * 0.8; 
        } else if(random == 3){
            this.y -= this.speed;
            this.direction = Math.PI * 2.4; 
        }
    }

}

export default Enemy;
