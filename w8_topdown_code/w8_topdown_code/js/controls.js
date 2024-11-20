/*-------------------------------
Booleans to store whether a specific button is pressed or not
 --------------------------------*/
var w = false;
var a = false;
var s = false;
var d = false;
var sp = false;
var up = false;
var down = false;
var left = false;
var right = false;
var r = false;

/*---Key Press Code-----------*/

document.addEventListener(`keydown`, press);
function press(e)
{
    if(e.keyCode == 87){w = true}
    if(e.keyCode == 83){s = true;}
    if(e.keyCode == 65){a = true;}
    if(e.keyCode == 68){d = true;}
    if(e.keyCode == 38){up = true;}
    if(e.keyCode == 40){down = true;}
    if(e.keyCode == 37){left = true;}
    if(e.keyCode == 39){right = true;}
    if(e.keyCode == 32){sp = true;}
    if(e.keyCode == 82){r = true;}
}

/*---Key Release Code-----------*/
document.addEventListener(`keyup`, release);
function release(e)
{
    if(e.keyCode == 87){w = false;}
    if(e.keyCode == 83){s = false;}
    if(e.keyCode == 65){a = false;}
    if(e.keyCode == 68){d = false;}
    if(e.keyCode == 38){up = false;}
    if(e.keyCode == 40){down = false;}
    if(e.keyCode == 37){left = false;}
    if(e.keyCode == 39){right = false;}
    if(e.keyCode == 32){sp = false;}
    if(e.keyCode == 82){r = false;}
}

var mouse = {x:0 ,y:0, pressed:false, world:{x:0,y:0}}

document.addEventListener(`mousemove`, move)
document.addEventListener(`mouseup`, rest)
document.addEventListener(`mousedown`, action)

function move(e)
{
    const rect = c.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
}
function action(e)
{
    mouse.pressed = true;
}
function rest(e)
{
    mouse.pressed = false;
}
function clicked(_obj)
{
    if(_obj.isOverPoint(mouse) && mouse.pressed == true)
    {
        return true
    }
    return false;
}