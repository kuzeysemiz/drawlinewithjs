var canvas = document.querySelector('canvas');
var kareBtn = document.getElementById('kareBtn');
var lineBtn = document.getElementById('lineBtn');
canvas.width = 1000;
canvas.height = 1000;
var escpressing;
var shiftPressing;
var sonObje;
var sonObjeSonCizgi;
var sonObjeCizgiSayisi;
var line = new Line();
var uzaklik;
var firstx,firsty,secondx,secondy;
var ctx = canvas.getContext('2d');
var mouseDistance = 20;
var onDrawing = false;
var lines = [];
var linesList = [];
var lineBtnCheck = true;
var kare = false;

console.log(lines.length);
kareBtn.onclick = function(){
    kare = true;
    console.log("Kare: "+kare);

}
lineBtn.onclick = function(){
    kare = false;
    lineBtnCheck = true;
    console.log("line: "+lineBtnCheck);
}
////////KARE İÇİN////
var shift;
var rect = new Rect();
var rects = [];
var firstx,firsty;
var rectWith,rectHeight;
var clicking;
var kare = false;
function Rect(firstx,firsty,rectWith,rectHeight){
    this.firstx = firstx;
    this.firsty = firsty;
    this.rectWith = rectWith;
    this.rectHeight = rectHeight;
    this.draw = function(){
        ctx.clearRect(0,0,innerWidth,innerHeight)
        ctx.beginPath();
        ctx.rect(this.firstx,this.firsty,this.rectWith,this.rectHeight)
        ctx.stroke();

    }
}
var mouse = {
    x: undefined,
    y: undefined
}
var icinde;
canvas.addEventListener("mouseout",function(){
    icinde = false;
    console.log("Mouse dışarda");
})

canvas.addEventListener("mouseenter",function(){
    icinde = true;
    console.log("Mouse içerde");

})
var kpressed = false;
window.addEventListener('keyup',function(e){
    shiftPressing = e.shiftKey;
    if(e.key == "Escape"){
        escpressing = false;
    }
    if(e.key = "K"){
        kpressed;
    }
})
window.addEventListener('keydown',function(e){
    shiftPressing = e.shiftKey;
    if(e.key == "Escape"){
        escpressing = true;
    }
})
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

window.addEventListener("mouseup",function(){
    rectWith = mouse.x-firstx;
    rectHeight = mouse.y - firsty;
    console.log(rectHeight + " "+ rectWith);
    if(shiftPressing){
        if((firstx - mouse.x) < 0 && (firsty-mouse.y) > 0 || (firstx - mouse.x) > 0 && (firsty-mouse.y) < 0){
            console.log("Sol Üst");
            rects.push(new Rect(firstx,firsty,(mouse.x-firstx),-(mouse.x-firstx)));
        }
        else
            rects.push(new Rect(firstx,firsty,mouse.x-firstx,mouse.x-firstx));
    
    }
    else if(kare && icinde)
        rects.push(new Rect(firstx,firsty,rectWith,rectHeight));
    clicking = false;
})
window.addEventListener('mousedown',function(){
    if(!icinde)
    return;
        clicking = true;
        firstx = mouse.x;
        firsty = mouse.y;

        if(lineBtnCheck){
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
        }
})
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)
    if(kare)
    {
        if(shiftPressing){
            if(clicking){
                ctx.beginPath();
                if((firstx - mouse.x) < 0 && (firsty-mouse.y) > 0 || (firstx - mouse.x) > 0 && (firsty-mouse.y) < 0){
                    console.log("Sol Üst");
                    ctx.rect(firstx,firsty,(mouse.x-firstx),-(mouse.x-firstx));
                }
                else
                    ctx.rect(firstx,firsty,mouse.x-firstx,mouse.x-firstx);
                ctx.stroke();
            }
        }
        else{
            if(clicking){
                ctx.beginPath();
                ctx.rect(firstx,firsty,mouse.x-firstx,mouse.y-firsty);
                ctx.stroke();
            }
        }
        
    }
    else {
        if(lines[lines.length - 1] != undefined)
        {
            lines[lines.length - 1].update();
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
            else
            {
                if(!escpressing)
                {
                    uzaklik = Math.pow((mouse.x-lines[0].firstx),2) + Math.pow((mouse.y-lines[0].firsty),2);
                    uzaklik = Math.sqrt(uzaklik);
                    if(uzaklik < 20)
                    {
                        lines[lines.length - 1].secondx = lines[0].firstx;
                        lines[lines.length - 1].secondy = lines[0].firsty;
            
                    }
                    else
                    {
                        if(kpressed){

                        }
                        lines[lines.length - 1].secondx = mouse.x;
                        lines[lines.length - 1].secondy = mouse.y;
                    }
                }
                else{
                    lines.splice(lines.length - 1,lines.length);
                    lines[lines.length - 1].update();
                    linesList.push(lines);
                    lines = [];
                    console.log(linesList.length);
                    escpressing = false;
                }
            }
            
        }
    }
    if(lines != []){
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
    if(rects[rects.length - 1] != undefined)
        {
            for(var i = 0;i < rects.length;i++){
                ctx.beginPath();
                ctx.rect(rects[i].firstx,rects[i].firsty,rects[i].rectWith,rects[i].rectHeight);
                ctx.stroke();
            }
        }
}
animate();
