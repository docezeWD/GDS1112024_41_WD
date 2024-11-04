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
player.w = 40;
player.h = 80;

var speed = 6;
var friction = 0.8;

// generate enemies

var enemies=[];
var enemyAmnt = 80;

for(var i = 0; i<enemyAmnt; i++){
    enemies[i] = new GameObject();
    enemies[i].color = "red";
    enemies[i].h = 30;
    enemies[i].w = 30;
    enemies[i].x = rand(0,c.width);
    enemies[i].y = rand(0,c.height);

}


/*--------------main()------------------------
This is the function that makes the game work
---------------------------------------------*/

function main()
{
    //erases the screen
    ctx.clearRect(0,0,c.width,c.height); 

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

    //Any collision detection 

    //draw the pictures
    for(var i = 0; i<enemies.length; i++){
        enemies[i].render();
    }
    player.move();
    player.render();
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

               /|        c = the hypoteneuse
            c / |        b = height
             /  | b      a = width
            /   |        T = arch tangent angle
           /T___|
             a

--------------------------

To get a and b (displacement) when you know two points
  
    a = destination.x - starting.x
    b = destination.y - starting.y

To get the total distance (hypotenuese) between two points
    c = Math.sqrt(_a*_a + _b*_b)

To get the arc tangent angle (labeled T in the diagram)
    radians = Math.atan2(b, a)
    
    angelica
    pillar of slime
    solitude redworld
    poison stash 99 insertion
    not true not true
    swallowed castles
    realization of time and place
    angelica radiantz

To find a and b if you know c and T
    a = Math.cos(T) * c
    b = Math.sin(T) * c
*/
