var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
var fps = 1000/60;
var timer = setInterval(gameLoop, fps);

var w = false;
var a = false;
var s = false;
var d = false;
var up = false;
var down = false;
var left = false;
var right = false;

document.addEventListener('keydown',press);

function press(event){
    console.log(event.keyCode);
    if(event.keyCode==87){w=true}
    if(event.keyCode==65){a=true}
    if(event.keyCode==83){s=true}
    if(event.keyCode==68){d=true}
    if(event.keyCode==38){up=true}
    if(event.keyCode==40){down=true}
    if(event.keyCode==37){left=true}
    if(event.keyCode==39){right=true}
}

document.addEventListener('keyup',release)

function release(event){
    console.log(event.keyCode);
    if(event.keyCode==87){w=false}
    if(event.keyCode==65){a=false}
    if(event.keyCode==83){s=false}
    if(event.keyCode==68){d=false}
    if(event.keyCode==38){up=false}
    if(event.keyCode==40){down=false}
    if(event.keyCode==37){left=false}
    if(event.keyCode==39){right=false}
}

class GameObject{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 30;
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.8;
        this.color = "black";
    }

    drawObj(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        ctx.arc(0,0,this.radius,this.startAngle,this.endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    move(){
        this.vx = this.vx * this.friction;
        this.vy = this.vy * this.friction;
        this.x += this.vx;
        this.y += this.vy;
    }
}

var player = new GameObject();
var speed = 9;

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(a==true){player.vx=-speed}
    if(d==true){player.vx=speed}
    if(w==true){player.vy=-speed}
    if(s==true){player.vy=speed}
    player.move();
    player.drawObj();
    
}