var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 600;
let lbl_firstX = document.getElementById("lbl_firstX");
var lbl_firstY = document.getElementById('lbl_firstY');
var lbl_secondX = document.getElementById('lbl_secondX');
var lbl_secondY = document.getElementById('lbl_secondY');
var escpressing;
var shiftPressing;
var ctrlz;

var sonObje;
var sonObjeSonCizgi;
var sonObjeCizgiSayisi;

var line = new Line();
var sonxuzakligi,sonyuzakligi,uzaklik;
var firstx,firsty,secondx,secondy;
var ctx = canvas.getContext('2d');
var mouseDistance = 37;
var onDrawing = false;
var lines = [];
var linesList = [];
console.log(lines.length);
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
function sonObjeGuncelle()
{
    sonObje = linesList[linesList.length - 1];
    sonObjeSonCizgi = sonObje[sonObje.length -1];
    sonObjeCizgiSayisi = sonObje.length;
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y - mouseDistance;
    
})

window.addEventListener('mousedown',function(){
        firstx = mouse.x;
        firsty = mouse.y;
        if(lines.length > 1)
        {
            if((lines[lines.length - 1].secondx == lines[0].firstx) && (lines[lines.length - 1].secondy == lines[0].firsty))
            {
                escpressing = false;
                linesList.push(lines);
                lines = [];
                sonObjeGuncelle();
                console.log(linesList.length);

            }
            else{
                lines.push(new Line((lines[lines.length - 1].secondx,lines[lines.length - 1].secondy)));
                console.log(lines);
            }
    
        }
        else{
            lines.push(new Line(mouse.x,mouse.y))
            console.log(lines);
        }
})
window.addEventListener('keyup',function(e){
    shiftPressing = e.shiftKey;

    if (e.key === "Escape")
    {
        escpressing = false;
    }
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
    {
       
    }
})
window.addEventListener('keydown',function(e){
    shiftPressing = e.shiftKey;
    if (e.key === "Escape")
    {
        escpressing = true;
    }
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
    {

    }

})
function animate(){
    requestAnimationFrame(animate);
    if(lines[lines.length - 1] != undefined)
    {
        lines[lines.length - 1].update();
        lbl_firstX.innerHTML = "First X: "+mouse.x;
        lbl_firstY.innerHTML = "First Y: "+mouse.y;
        if(lines.length != 1)
        {
            lines[lines.length - 1].firstx = lines[lines.length - 2].secondx;
            lines[lines.length-1].firsty = lines[lines.length-2].secondy;
        }
        if(shiftPressing)
        {
            var xfarki = Math.abs(mouse.x - lines[lines.length - 1].firstx);
            var yfarki = Math.abs(mouse.y - lines[lines.length - 1].firsty);
            if( xfarki > yfarki)
            {
                lines[lines.length - 1].secondx = mouse.x;
                lines[lines.length - 1].secondy = lines[lines.length-1].firsty;
            }
            else if(yfarki > xfarki)
            {
                lines[lines.length - 1].secondx = lines[lines.length-1].firstx;
                lines[lines.length - 1].secondy = mouse.y;
            }
        }
        if(escpressing){
            lines.splice(lines.length - 1,1);
        }
        else{
            lines[lines.length - 1].secondx = mouse.x;
            lines[lines.length - 1].secondy = mouse.y;
        }
        for(var i = 0; i < lines.length - 1;i++){
            ctx.beginPath();
            ctx.moveTo(lines[i].firstx,lines[i].firsty);
            ctx.lineTo(lines[i].secondx,lines[i].secondy);
            ctx.stroke();
    
        }
        for(var x = 0; x < linesList.length;x++)
        {
            var linesX = linesList[x];
            for(var i = 0; i < linesX.length;i++)
            {
                ctx.beginPath();
                ctx.moveTo(linesX[i].firstx,linesX[i].firsty);
                ctx.lineTo(linesX[i].secondx,linesX[i].secondy);
                ctx.stroke();
            }
        }
    
    }

    if(escpressing){

        escpressing = false;
        linesList.push(lines);
        lines = [];
        sonObjeGuncelle();
        console.log(linesList.length);
        
    }
}
animate();

