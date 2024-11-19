
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var sword = new GameObject();
var bad = [];
var wall = [];

function init()
{
    state = menu

    avatar.color = `green`;
    avatar.w = 40;
    avatar.h = 40;

    level.x = 0; 
    level.y = 0;

    wall[0]=new GameObject();
    wall[0].h = 20;
    wall[0].w = 800;
    wall[0].color = `purple`
    wall[0].x = (c.width/2)+100;
    wall[0].y = 1100
    wall[0].world = level

    wall[1]=new GameObject();
    wall[1].h = 400;
    wall[1].w = 24;
    wall[1].color = `purple`
    wall[1].x = 1900;
    wall[1].y = c.height/2
    wall[1].world = level

    wall[2]=new GameObject();
    wall[2].h = 800;
    wall[2].w = 24;
    wall[2].color = `purple`
    wall[2].x = 1500;
    wall[2].y = c.height/2
    wall[2].world = level

    wall[3]=new GameObject();
    wall[3].w = 400;
    wall[3].h = 24;
    wall[3].color = `purple`
    wall[3].x = (c.width/2)
    wall[3].y = c.height-1100
    wall[3].world = level

    sword.color = `#000000`;
    sword.x = 100;
    sword.h = 70;
    sword.w = 70;

    bad[0]=new GameObject();
    bad[0].x = 100;
    bad[0].y = 100;
    bad[0].world = level;
    bad[0].hp = 100;
    // bad.color = `red`;
    // bad.x = 100;
    // bad.y = 100;
    // bad.world = level;
    // bad.hp = 100;

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{

}
function lose()
{

}

function game()
{
    

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
    }
    if(w == true)
    {
        avatar.vy += -1;
    }
    if(s == true)
    {
        avatar.vy += 1;
    }
    if(up == true)
    {
        // sword.x = avatar.top().x;
        // sword.y = avatar.top().y;
        // sword.w = 12;
        // sword.h = 100;
        sword.vy-=4;
    }
    if(down == true)
    {
        // sword.x = avatar.bottom().x;
        // sword.y = avatar.bottom().y;
        // sword.w = 12;
        // sword.h = 100;
        sword.vy+=4;
    }
    if(left == true)
    {
        // sword.x = avatar.left().x;
        // sword.y = avatar.left().y;
        // sword.h = 12;
        // sword.w = 100;
        sword.vx-=4;
    }
    if(right == true)
    {
        // sword.x = avatar.right().x;
        // sword.y = avatar.right().y;
        // sword.h = 12;
        // sword.w = 100;
        sword.vx+=4;
    }
    if(sp == true)
    {
        sword.x = avatar.x
        sword.y = avatar.y
    }
    avatar.vx *= .85;
    avatar.vy *= .85;
    sword.vx *= .85;
    sword.vy *= .85;
    avatar.move();
    sword.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    for(let i=0; i<wall.length; i++)
    {
        while(wall[i].isOverPoint(avatar.bottom()))
        {
            avatar.vy = 0;
            avatar.y--;
            offset.y--;
        }
        while(wall[i].isOverPoint(avatar.top()))
        {
            avatar.vy = 0;
            avatar.y++;
            offset.y++;
        }
        while(wall[i].isOverPoint(avatar.left()))
        {
            avatar.vx = 0;
            avatar.x++;
            offset.x++;
        }
        while(wall[i].isOverPoint(avatar.right()))
        {
            avatar.vx = 0;
            avatar.x--;
            offset.x--;
        }
        while(wall[i].isOverPoint(sword.bottom()))
        {
            sword.vy = 0;
            sword.y--;
        }
        while(wall[i].isOverPoint(sword.top()))
        {
            sword.vy = 0;
            sword.y++;
        }
        while(wall[i].isOverPoint(sword.left()))
        {
            sword.vx = 0;
            sword.x++;
        }
        while(wall[i].isOverPoint(sword.right()))
        {
            sword.vx = 0;
            sword.x--;
        }
    }
    
    // if(sword.overlaps(bad))
    // {
    //     bad.hp--;
    // }
    // if(bad.hp<=0)
    // {
    //     bad.x = 10000;
    // }
   

    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    // {
    //     Level movement code
    //     level.x -= offset.x;
    //     avatar.x -= offset.x;
    //     level.y -= offset.y;
    //     avatar.y -= offset.y;
    // }

    /*----- Camera Code -----------
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    ----------------------------*/

    for(var i = 0;i<bad.length;i++){
        if(sword.overlaps(bad[i])){
            bad[i].hp--;
        }
        if(bad[i].hp<=0){
            bad[i].x = 10000;
        }
        bad[i].render();
    }
   for(let i=0;i<wall.length; i++)
   {
    wall[i].render();
   }

    ctx.beginPath();
    ctx.moveTo(avatar.x,avatar.y)
    ctx.lineTo(sword.x,sword.y)
    ctx.closePath();
    ctx.stroke();
    sword.render();
    avatar.render();
}


