
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
var trainingButton = new GameObject();
var button2 = new GameObject();
var button3 = new GameObject();
var bossButton = new GameObject();
var avatar = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var mace = new GameObject();
var enemies = [];
var enemyAmnt = 15;
var enemiesLeft = 180;
var dummy = new GameObject();
var playerhp = 5;
var castlehp = 10;
var trainingHits = 0;
var boss = new GameObject();
var bossMinion = [];
var minionAmnt = 5;
var bossBullet = [];
var bulletAmnt = 5;
var bossInvincible = false;
var bosshp = 100;
var bossModeUnlocked = false;

function init()
{
    state = menu

    trainingButton.color = `orange`;
    trainingButton.w = 180;
    trainingButton.h = 50;
    trainingButton.y = (c.height/2)+100;

    button.x = (c.width/2) - 120;

    button2.color = `red`;
    button2.x = (c.width/2);

    button3.color = `purple`;
    button3.x = (c.width/2) + 120;

    bossButton.color = `black`;
    bossButton.w = 40;
    bossButton.h = 40;
    bossButton.x = 750;
    bossButton.y = 450;

    avatar.color = `green`;
    avatar.w = 40;
    avatar.h = 40;

    level.x = 0; 
    level.y = 0;

    mace.color = `#000000`;
    mace.x = 300;
    mace.y = 200;
    mace.h = 70;
    mace.w = 70;

    dummy.w = 80;
    dummy.h = 80;
    dummy.color = `orange`;
    dummy.x = c.width/2
    dummy.y = 80;

    boss.w = 150;
    boss.h = 150;
}

function enemyinit()
{
    enemyAmnt = 15;
    enemiesLeft = 180;
    
    for(var i = 0;i<enemyAmnt;i++){
        enemies[i] = new GameObject();
        enemies[i].h = 40;
        enemies[i].w = 40;
        enemies[i].vy = rand(1,2);
        enemies[i].x = rand(0,c.width);
        enemies[i].y = rand(-c.height,0);
    }
}

function inithard()
{
    enemyAmnt = 18;
    enemiesLeft = 180;
    
    for(var i = 0;i<enemyAmnt;i++){
        enemies[i] = new GameObject();
        enemies[i].color = "red";
        enemies[i].h = 40;
        enemies[i].w = 40;
        enemies[i].vy = rand(1,2.5);
        enemies[i].x = rand(0,c.width);
        enemies[i].y = rand(-c.height,0);
    }
}

function initinsane()
{
    enemyAmnt = 25;
    enemiesLeft = 180;

    for(var i = 0;i<enemyAmnt;i++){
        enemies[i] = new GameObject();
        enemies[i].color = "purple";
        enemies[i].h = 40;
        enemies[i].w = 40;
        enemies[i].vy = rand(1,3);
        enemies[i].x = rand(0,c.width);
        enemies[i].y = rand(-c.height,0);
    }
}

function bossinit()
{
    bosshp = 100;
    boss.x = c.width/2;
    boss.y = 100;
    boss.vx = 1;
    minionAmnt = 8;
    bulletAmnt = 6;

    for(var i = 0;i<minionAmnt;i++){
        bossMinion[i] = new GameObject();
        bossMinion[i].h = 50;
        bossMinion[i].w = 50;
        bossMinion[i].vy = 1;
        bossMinion[i].x = rand(0,c.width);
        bossMinion[i].y = rand(-c.height,0);
    }

    for(var i = 0;i<bulletAmnt;i++){
        bossBullet[i] = new GameObject();
        bossBullet[i].h = 20;
        bossBullet[i].w = 20;
        bossBullet[i].color = `red`;
        bossBullet[i].vx = rand(2,5);
        bossBullet[i].x = 0;
        bossBullet[i].y = rand(0,c.height);
    }
}

init();

function control()
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
        if((Math.abs(mace.y-avatar.y)<=300) && (Math.abs(mace.x-avatar.x)<=300))
        {
            if(up == true)
            {
                mace.vy-=4;
            }
            if(down == true)
            {
                mace.vy+=4;
            }
            if(left == true)
            {
                mace.vx-=3;
            }
            if(right == true)
            {
                mace.vx+=3;
            }
            ctx.strokeStyle = "black";
        } else {ctx.strokeStyle = "red";}
            if(avatar.x>mace.x){mace.vx+=2;}else if(avatar.x<mace.x){mace.vx-=2;}else{mace.vx=0}
            if(avatar.y>mace.y){mace.vy+=2;}else if(avatar.y<mace.y){mace.vy-=2;}else{mace.vy=0}
        avatar.vx *= .85;
        avatar.vy *= .85;
        mace.vx *= .88;
        mace.vy *= .88;
        avatar.move();
        mace.move();
}

function menu()
{
    avatar.x = c.width/2;
    avatar.y = c.height/2;
    mace.x = 300;
    mace.y = 200;
    playerhp = 5;
    castlehp = 10;
    mace.vx = 0;
    mace.vy = 0;
    avatar.vx = 0;
    avatar.vy = 0;
    dummy.x = c.width/2
    dummy.y = 80;
    trainingHits = 0;

    if(clicked(button))
    {
        enemyinit();
        state = classicmode;
    }
    if(clicked(trainingButton))
    {
        state = training;
    }
    if(clicked(button2))
    {
        inithard();
        state = hardmode;
    }
    if(clicked(button3))
    {
        initinsane();
        state = insanemode;
    }

        if(clicked(bossButton))
            {
                bossinit();
                state = bossmode;
            }
        bossButton.render();

    button.render();
    trainingButton.render();
    button2.render();
    button3.render();
}

function win()
{
    ctx.font = "40px Arial";
    ctx.fillText(`Win Screen`,30,60);
    if(r==true){state=menu;}
}
function lose()
{
    ctx.font = "60px Arial";
    ctx.fillText(`Lose Screen`,30,60);
    if(r==true){state=menu;}
}

function training()
{
        control();

        if(mace.overlaps(dummy))
        {
            dummy.x = rand(0,c.width);
            dummy.y = rand(0,c.height);
            trainingHits++;
        }

        if(r==true){state=menu;}

        dummy.render();
        ctx.beginPath();
        ctx.moveTo(avatar.x,avatar.y)
        ctx.lineTo(mace.x,mace.y)
        ctx.closePath();
        ctx.stroke();
        mace.render();
        avatar.render();
        ctx.font = "30px Arial";
        ctx.fillText(`Hits: ${trainingHits}`,30,60);
        ctx.fillText(`Press the R key to exit training mode`,30,460)
}

function game()
{
    control();

    for(var i = 0;i<enemyAmnt;i++){
        enemies[i].move();
        enemies[i].render();
        if(enemies[i].y > (c.height + enemies[i].h)){
            enemies[i].x = rand(0,c.width);
            enemies[i].y = rand(-c.height,0);
            castlehp--;
        }
        if(mace.overlaps(enemies[i])){
            enemies[i].x = rand(0,c.width);
            enemies[i].y = rand(-c.height,0);
            enemiesLeft--;
        }
        if(avatar.overlaps(enemies[i])){
        enemies[i].x = rand(0,c.width);
        enemies[i].y = rand(-c.height,0);
        playerhp--;
        enemiesLeft--;
     }
    }

    if(r==true){state=menu;}

    ctx.beginPath();
    ctx.moveTo(avatar.x,avatar.y)
    ctx.lineTo(mace.x,mace.y)
    ctx.closePath();
    ctx.stroke();
    mace.render();
    avatar.render();
    ctx.font = "30px Arial";
    ctx.fillText(`Health: ${playerhp}`,30,60);
    ctx.fillText(`Castle: ${castlehp}`,30,100);
    ctx.fillText(`Enemies left: ${enemiesLeft}`,500,60);

    if(playerhp<=0){state = lose;}
    if(castlehp<=0){state = lose;}
    if(enemiesLeft<=0){state = win;}
}

function classicmode()
{
    game();
    ctx.font = "30px Arial";
    ctx.fillText(`Classic Mode`,30,450);
}

function hardmode()
{
    game();
    ctx.font = "30px Arial";
    ctx.fillText(`Hard Mode`,30,450);
}

function insanemode()
{
    game();
    ctx.font = "30px Arial";
    ctx.fillText(`Insane Mode`,30,450);
}

function bossmode()
{
    control();

    if(r==true){state=menu;}

    if(boss.x>(c.width-boss.w))
    {
        boss.vx *= -1;
    }
    if(boss.x<(0+boss.w))
    {
        boss.vx *= -1;
    }

    if(bossInvincible==false)
    {
        if(mace.overlaps(boss))
            {
                bosshp--;
                bossInvincible = true;
            }
    }
    if(bossInvincible==true)
    {
        if(!mace.overlaps(boss))
        {
            bossInvincible = false;
        }
    }

    for(var i = 0;i<minionAmnt;i++){
        bossMinion[i].move();
        bossMinion[i].render();
        if(bossMinion[i].y > (c.height + bossMinion[i].h)){
            bossMinion[i].x = rand(0,c.width);
            bossMinion[i].y = rand(-c.height,0);
            castlehp--;
        }
        if(mace.overlaps(bossMinion[i])){
            bossMinion[i].x = rand(0,c.width);
            bossMinion[i].y = rand(-c.height,0);
        }
        if(avatar.overlaps(bossMinion[i])){
        bossMinion[i].x = rand(0,c.width);
        bossMinion[i].y = rand(-c.height,0);
        playerhp--;
     }
    }

    for(var i = 0;i<bulletAmnt;i++)
    {
        bossBullet[i].move();
        bossBullet[i].render();
        if(avatar.overlaps(bossBullet[i])){
            bossBullet[i].x = 0;
            bossBullet[i].y = rand(0,c.height);
            playerhp--;
        }
    if(bossBullet[i].x>(c.width+20))
        {
            bossBullet[i].y = rand(0,c.height);
            bossBullet[i].vx = rand(2,5);
            bossBullet[i].vx *= -1;
        }
    if(bossBullet[i].x<(-20))
        {
            bossBullet[i].y = rand(0,c.height);
            bossBullet[i].vx = rand(-2,-5);
            bossBullet[i].vx *= -1;
        }
    }

    if(bosshp<=70)
    {
        for(var i = 0;i<minionAmnt;i++){
            bossMinion[i].vy = 2;
        }
    }
    if(bosshp<=40)
    {
        for(var i = 0;i<minionAmnt;i++){
            bossMinion[i].vy = 3;
        }
    }

    ctx.beginPath();
    ctx.moveTo(avatar.x,avatar.y)
    ctx.lineTo(mace.x,mace.y)
    ctx.closePath();
    ctx.stroke();
    boss.move();
    boss.render();
    mace.render();
    avatar.render();
    ctx.font = "30px Arial";
    ctx.fillText(`Health: ${playerhp}`,30,60);
    ctx.fillText(`Castle: ${castlehp}`,30,100);
    ctx.fillText(`Boss: ${bosshp}`,500,60);

    if(playerhp<=0){state = lose;}
    if(castlehp<=0){state = lose;}
    if(bosshp<=0){state = win;}

    ctx.fillText(`Boss Mode`,30,450);
}