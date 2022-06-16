import "@/style.css";
import Player from "@/player";
import Map from "@/Map";
document.getElementById("app").innerHTML = `
    <canvas id="game"></canvas>
`;
let canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let player = new Player(1.0, 1.0);
let lv1 = new Map();
let lv = 1;
lv1.loadLv(lv);
let keys = [];
let lastKey;
let lastTime = 0;
let fps = 30;
let interval = 1000/fps;
let color = 0;


const restart = () => {
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    player = new Player(1.0, 1.0);
    lv1 = new Map();
    lv = 1;
    lv1.loadLv(lv);
    keys = [];
    lastKey;
    lastTime = 0;
    fps = 30;
    interval = 1000/fps;
    color = 0;
};

restart();

const mainLoop = (timeStamp) => {
    var delta = timeStamp - lastTime;
    if(delta > interval){
        ctx.fillStyle = "black";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(lv1.getCanvas(), (canvas.width - lv1.getWidth()) / 2, (canvas.height - lv1.getHeight()) / 2, lv1.getWidth(), lv1.getHeight());
        ctx.drawImage(player.getCanvas(), (canvas.width - lv1.getWidth()) / 2 + 40 * player.x, (canvas.height - lv1.getHeight()) / 2 + 40 * player.y);
        player.move(keys, lv1, lv1.particles);
        lv1.enemys.forEach(v => v.move(lv1, lv1.particles));
        lastTime = timeStamp;
        ctx.fillStyle = "white";
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("Score: " + lv1.score, 30, 30);
        if(lv1.particles.length < 1){
            if(color < 360){
                color++;
            }else {
                color = 0;
            }
            ctx.fillStyle = `hsl(${color}, 100%, 67%)`;
            ctx.font = "300px Comic Sans MS";
            ctx.fillText("WIN", (canvas.width - 680) / 2, (canvas.height + 250) / 2);
            ctx.font = "30px Comic Sans MS";
            ctx.fillText("Press any button to restart", (canvas.width - 30) / 2, (canvas.height + 330) / 2);
            window.removeEventListener("keydown", move);
            window.addEventListener("keydown", a);
        }
    }
    requestAnimationFrame(mainLoop);
};
mainLoop(0);

function a() {
    cancelAnimationFrame(mainLoop);
    restart();
    window.addEventListener("keydown", move);
    window.removeEventListener("keydown", a);
}
window.addEventListener("keydown", move);

function move(e) {
    if(
        e.keyCode == 83 ||
        e.keyCode == 68 ||
        e.keyCode == 87 ||
        e.keyCode == 65
    ) {
        delete keys[lastKey];
        keys[e.keyCode] = true;
        lastKey = e.keyCode;
    }

}
