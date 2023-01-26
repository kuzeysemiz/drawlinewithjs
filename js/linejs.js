var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 600;
let lbl_firstX = document.getElementById("lbl_firstX");
var lbl_firstY = document.getElementById('lbl_firstY');
var lbl_secondX = document.getElementById('lbl_secondX');
var lbl_secondY = document.getElementById('lbl_secondY');


var firstx,firsty,secondx,secondy;
var ctx = canvas.getContext('2d');
var mouseDistance = 37;
var onDrawing = false;
var linesList = new Array();
var willWriteX = 0,willWriteY = 0;
var mouse = {
    x: undefined,
    y: undefined
}

function Line(firstx,firsty,secondx,secondy)
{
    this.firstx = firstx;
    this.firsty = firsty;
    this.secondx = secondx;
    this.secondy = secondy;
    this.draw = function(){
        ctx.beginPath();
        ctx.moveTo(this.firstx,this.firsty);
    }
    this.update = function(){
        ctx.clearRect(0,0,innerWidth,innerHeight)
        this.draw();
        ctx.lineTo(this.secondx,this.secondy);
        ctx.stroke();
    }
}
var line = new Line();
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('mousedown',function(){
        firstx = mouse.x;
        firsty = mouse.y;
        console.log(firsty);
        if (linesList[willWriteX] === undefined)
        {
            linesList[willWriteX] = new Array();
        }
        linesList[willWriteX].push(new Line(mouse.x,mouse.y))

})
var escpressing;
var shiftPressing;
window.addEventListener('keyup',function(e){
    shiftPressing = e.shiftKey;

    if (e.key === "Escape")
    {
        escpressing = false;
    }
    
})
window.addEventListener('keydown',function(e){
    shiftPressing = e.shiftKey;

    if (e.key === "Escape")
    {
        escpressing = true;
    }
})
function animate(){
    requestAnimationFrame(animate);
    if(linesList[willWriteX] != undefined && !escpressing)
    {
        linesList[willWriteX][linesList[willWriteX].length - 1].update();
        lbl_firstX.innerHTML = "First X: "+mouse.x;
        lbl_firstY.innerHTML = "First Y: "+mouse.y;
        if(linesList[willWriteX].length != 1)
        {
            linesList[willWriteX][linesList[willWriteX].length - 1].firstx = linesList[willWriteX][linesList[willWriteX].length - 2].secondx;
            linesList[willWriteX][linesList[willWriteX].length - 1 ].firsty = linesList[willWriteX][linesList[willWriteX].length - 2 ].secondy;
        }
        if(shiftPressing)
        {
            var xfarki = Math.abs(mouse.x - linesList[willWriteX][linesList[willWriteX].length - 1].firstx);
            var yfarki = Math.abs(mouse.y -linesList[willWriteX][linesList[willWriteX].length - 1].firsty);
            if( xfarki > yfarki)
            {
                linesList[willWriteX][linesList[willWriteX].length - 1].secondx = mouse.x;
                linesList[willWriteX][linesList[willWriteX].length - 1].secondy =linesList[willWriteX][linesList[willWriteX].length-1].firsty;
            }
            else if(yfarki > xfarki)
            {
                linesList[willWriteX][linesList[willWriteX].length - 1].secondx =linesList[willWriteX][linesList[willWriteX].length-1].firstx;
                linesList[willWriteX][linesList[willWriteX].length - 1].secondy = mouse.y;
            }
        }
        else
        {
            if(!escpressing){
                linesList[willWriteX][linesList[willWriteX].length - 1].secondx = mouse.x;
               linesList[willWriteX][linesList[willWriteX].length-1].secondy = mouse.y - mouseDistance;
            }
            else{
                linesList[willWriteX][linesList[willWriteX].length - 1].secondx =linesList[willWriteX][linesList[willWriteX].length - 1].firstx ;
                linesList[willWriteX][linesList[willWriteX].length-1].secondy =linesList[willWriteX][linesList[willWriteX].length - 1].firsty;
            }
            

        }

        for(var x = 0; x <linesList.length;x++)
        {
            var lines =linesList[x];
            for(var y = 0; y <lines.length;y++)
            {
                ctx.beginPath();
                ctx.moveTo(lines[y].firstx,lines[y].firsty);
                ctx.lineTo(lines[y].secondx,lines[y].secondy);
                ctx.stroke();
            }
        }

        // for(var i = 0; i <linesList.length;i++){
        //     ctx.beginPath();
        //     ctx.moveTo(lines[i].firstx,lines[i].firsty);
        //     ctx.lineTo(lines[i].secondx,lines[i].secondy);
        //     ctx.stroke();
        // }
        

    }
    else if(escpressing){
        escpressing = false;
        willWriteX += 1;
        console.log(linesList);
        
    }

}
animate();
