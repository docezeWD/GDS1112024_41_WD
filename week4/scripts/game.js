var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);


var rad = 60;
var h = 50;
var x = rad+10;
var y = canvas.height/2;
var velox = 5;
var veloy = 5;

function game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    x+=velox;
    y+=veloy;

    if(x>canvas.width-rad){
        velox *= -1;
    }

    if(x<rad){
        velox *= -1;
    }


    if(y>canvas.height-rad){
        veloy *= -1;
    }

    if(y<rad){
        veloy *= -1;
    }
    y+=veloy;

    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
    
}

game();