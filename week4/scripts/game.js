var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);

var x = 0;
var y = canvas.height/2;
var w = 100;
var h = 100;
var velo = 1;

function game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if(x<450){
        velo+=0.5;
    }
    else {
        velo-=1;
    }

    x+=velo;


    ctx.fillStyle = "cyan";
    ctx.fillRect(x,y,w,h);
}

game();