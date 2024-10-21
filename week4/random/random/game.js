var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var timer = setInterval(main, 1000/60)

//Array of colors
var colors = [];
colors[0] = `red`
colors[1] = `blue`
colors[2] = `green`
colors[3] = `yellow`
colors[4] = `orange`
colors[5] = `blue`
colors[6] = `purple`
colors[7] = `pink`
colors[8] = `cyan`
colors[9] = `magenta`
colors[10] = `black`

//Create an instance of the GameObject class
var box0 = new GameObject();
box0.x = Math.random()*c.width
box0.y = Math.random()*c.height
var randomW = Math.random() * (800 - 15) + 15;
var randomH = Math.random() * (800 - 15) + 15;

//Generate a random color
box0.color = colors[Math.round(Math.random()*10)];
box0.w = randomW;
box0.h = randomH;

function main()
{
    ctx.clearRect(0,0,c.width,c.height)
    
    box0.renderRect();
}




