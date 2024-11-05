/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)


/*------------Declare Variables Here--------*/
var player = new GameObject();
player.color = "cyan";
player.w = 120;
player.h = 50;

var speed = 9;
var friction = 0.8;
var score = 0;

var gameScenes = ["start", "game", "over"]
var currentScene = gameScenes[0];

var evil = document.getElementById("evil");
var guy = document.getElementById("guy");

// generate enemies

var enemies=[];
var enemyAmnt = 15;

for(var i = 0; i<enemyAmnt; i++){
    enemies[i] = new GameObject();
    enemies[i].color = "red";
    enemies[i].h = 30;
    enemies[i].w = 30;
    enemies[i].vy = 4;
    enemies[i].x = rand(0,c.width);
    enemies[i].y = rand(0,100);
}


/*--------------main()------------------------
This is the function that makes the game work 
safflower shapeshifter (dogma and the deathwish)
comfy muzzle
aftersun
nova leaves willow
two-spirit
yellow with rope
the monster with 21 faces
lingkhor
death comes alone, nayirah

---------------------------------------------*/

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    switch(currentScene){
        case "start":
            ctx.font = "64px Arial";
            ctx.fillText(`PRESS W TO START`,60,c.height/2);
            if(w==true){currentScene="game"}
            break;
        case "game":
            game();
            if(score>=100){currentScene="over"}
            break;
        case "over":
            ctx.font = "64px Arial";
            ctx.fillText(`YOU WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN`,60,c.height/2);
            break;

    }
}

function game(){
       //Any changes to numbers
       if(a==true || left==true){
        player.vx = -speed;
    }
    if(d==true || right==true){
        player.vx = speed;
    }
    if(w==true || up==true){
        player.vy = -speed;
    }
    if(s==true || down==true){
        player.vy = speed;
    }
    player.vx *= friction;
    player.vy *= friction;

    if(player.x >= c.width - player.w/2){
        player.x = c.width - player.w/2;
    }
    if(player.x <= 0 + player.w/2){
        player.x = 0 + player.w/2;
    }
    if(player.y >= c.height - player.h/2){
        player.y = c.height - player.h/2;
    }
    if(player.y <= 0 + player.h/2){
        player.y = 0 + player.h/2;
    }


    //Any collision detection 

    //draw the pictures
    for(var i = 0; i<enemies.length; i++){
        enemies[i].move();
        enemies[i].renderImage(evil);
        if(enemies[i].y > (c.height + enemies[i].h)){
            enemies[i].x = rand(0,c.width);
            enemies[i].y = rand(-c.height,0);
            if(enemies[i].vy == 4){
                score++;
            }
        }
        if(enemies[i].y < -enemies[i].h){
            enemies[i].x = rand(0,c.width);
            enemies[i].y = rand(-c.height,0);
            if(enemies[i].vy == -4){
                score-=10;
                if(score<0){score=0}
                enemies[i].vy = 4;
            }
        }
        if(enemies[i].overlaps(player)){
            enemies[i].vy = -4;
        }
    }



    ctx.font = "64px Arial";
    ctx.fillText(`Score: ${score}`,40,80);

    player.move();
    player.renderImage(guy);
}

a
//random number generator
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg)
{
    return _deg * Math.PI/180
}

//Converts radians to degrees
function degrees(_rad)
{
    return _rad * 180/Math.PI
}
/*-------Diagram--------

    angelica
    pillar of slime
    solitude redworld
    poison stash 99 insertion
    not true not true
    swallowed castles
    realization of time and place
    angelica radiantz

*/
