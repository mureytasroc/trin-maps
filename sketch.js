
var xc,yc;
var canvasY;
var topBarHeight;
var cnv, buffer;
var panX, panY;
var graphX, graphY;
var centerRatY, centerRatX;
var scrollPos=0;
var f3;
var imR;
    var imW;
    var imH;
var count = 0;
var pathnum = 0;

var fpp = 0.268211921;

var w = 950;
var h = 445;

var y1 = h*.28;
var y2 = h*.36;
var y3 = h*.72;
var y4 = h*.78;

var shortest, shortest1,shortest2;
var x,y,tx,ty;
var xOrig,yOrig,txOrig,tyOrig; 

var wid=950;
var hig=445;

var firstPass;

function preload() {
  f3 = loadImage("photos/floorplan3.jpg");
}

function setup() {
    firstPass=true;
    canvasY=63;
    topBarHeight=63;
    this._pixelDensity = 1;
    pixelDensity(1)
  cnv = createCanvas(parseInt(getStyle(document.getElementById("colorBox"),"left"))-parseInt(getStyle(document.getElementById("functionBox"),"width")), windowHeight-topBarHeight);
  xc = parseInt(getStyle(document.getElementById("functionBox"),"width"));
  yc = canvasY;
  cnv.position(xc, yc);
    cnv.parent("canvasdiv");
  cnv.background(255);
    
    imW=f3.width;
    imH=f3.height;
    imR=imH/imW;
    graphX=0;
    graphY=0;
    
    centerRatX=graphX/width;
    centerRatY=graphY/height;;
   
    
drawGrid();
    
    

 /* buffer=createGraphics(700,700);
  buffer.background(240);
buffer.position(xc, yc);
    buffer.parent("canvasdiv");*/


    //background(51);

}

function draw() {
 
    if (mouseIsPressed) {
        cnv.clear();
        graphX+=mouseX-panX;
        graphY+=mouseY-panY;
        drawGrid();
        centerRatX=graphX/width;
        centerRatY=graphY/height;
        panX=mouseX;
        panY=mouseY;
    }
    
    
   


    
}

function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  scrollPos += event.delta;

  //uncomment to block page scrolling
  return false;
}

/*function windowResized() {
    cnv.size(parseInt(getStyle(document.getElementById("colorBox"),"left"))-parseInt(getStyle(document.getElementById("functionBox"),"width")), windowHeight-topBarHeight);
    cnv.position(xc, yc);
    cnv.parent("canvasdiv");
    cnv.background(255);
    graphX=centerRatX*width;
    graphY=centerRatY*height;
    drawGrid();
    
}*/

function mousePressed() {
    panX=mouseX;
    panY=mouseY;
}

function mouseReleased() {
}

//mmma
function drawGrid(){
    
    var imW=f3.width;
    var imH=f3.height;
    var imR=imH/imW;
    image(f3, graphX, graphY, wid,hig);
    imW=width;
    imH=width*imR;
    
    cnv.strokeWeight(2);
    cnv.stroke(0,255,0,100);
    cnv.line(0,0,0,height);
    cnv.line(0,0,width,0);
    cnv.line(0,height,width,height);
    cnv.line(width,0,width,height);
    
    if(!firstPass){
    path();
        
        var timeE = document.getElementById("time");

    var timie = (parseFloat(shortest)*fpp*60*60/3.1/5280);
        timie = Math.round(timie*1000)/1000;
                timeE.innerHTML = "&nbsp;&nbsp;Journey Time: "+timie+" s";
        
        
    console.log(timie);
    }
    
    
    
}

function genPaths(){
    firstPass=false;
    var originE = document.getElementById("orIn");
    var destinationE = document.getElementById("desIn");

    
    var k = document.querySelectorAll('[value="N321"]')[0].getAttribute("data-y");
    

    

    stroke(0);
   strokeWeight(2);
count++;
if(count>50)
{
  count = 0;
  pathnum++;
}


if(pathnum>12)
{

  pathnum=0;
}

    
    drawGrid();


    xOrig=parseInt(document.querySelectorAll('[value="'+originE.value+'"]')[0].getAttribute("data-x"));
    yOrig=parseInt(document.querySelectorAll('[value="'+originE.value+'"]')[0].getAttribute("data-y"))+15;
    txOrig=parseInt(document.querySelectorAll('[value="'+destinationE.value+'"]')[0].getAttribute("data-x"));
    tyOrig=parseInt(document.querySelectorAll('[value="'+destinationE.value+'"]')[0].getAttribute("data-y"))+15;
    
   
    
    
    if(yOrig > tyOrig)
  {
   var holdery = yOrig;
   var holderx = xOrig;
   yOrig = tyOrig;
   tyOrig = holdery;
   xOrig = txOrig;
   txOrig = holderx;
  }
    

    
   

    

    drawGrid();
    path();
    
}

function distance(x1, y1, x2, y2){
  var num = sqrt(sq(x1-x2)+sq(y1-y2));
return(num);

}

function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}

function browserHeight() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}
function browserWidth() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return myWidth;
}


function path(){



    var dis1 = 0;
    var dis2 = 0;
    var dis3 = 0;
    var dis4 = 0;
    var dis5 = 0;
    var dis6 = 0;

    

  

  
x=parseInt(xOrig)+graphX;
    tx=parseInt(txOrig)+graphX;
y=parseInt(yOrig)+graphY;
ty=parseInt(tyOrig)+graphY;
    


  strokeWeight(5);
  stroke(255,0,0);



    


  if((y < graphY+imH/6 && ty > graphY+imH/6))
  {


    dis1 = distance(x, y, graphX + w*0.47, graphY+y2) + distance(graphX + w*0.47, graphY+y2, graphX + w*0.47, graphY+y3) + distance(graphX + w*0.47, graphY+y3, tx, ty);
    dis2 = distance(x, y, graphX + w*0.47, graphY+y2) + distance(graphX + w*0.47, graphY+y2, graphX + w*0.49, graphY+y3) + distance(graphX + w*0.49, graphY+y3, tx, ty);
    dis3 = distance(x, y, graphX + w*0.49, graphY+y2) + distance(graphX + w*0.49, graphY+y2, graphX + w*0.47, graphY+y3) + distance(graphX + w*0.47, graphY+y3, tx, ty);
    dis4 = distance(x, y, graphX + w*0.49, graphY+y2) + distance(graphX + w*0.49, graphY+y2, graphX + w*0.49, graphY+y3) + distance(graphX + w*0.49, graphY+y3, tx, ty);
    dis5 = distance(x, y, graphX + w*0.95, graphY+y2) + distance(graphX + w*0.95, graphY+y2, graphX + w*0.95, graphY+y3) + distance(graphX + w*0.95, graphY+y3, tx, ty);
    dis6 = distance(x, y, graphX + w*0.4, graphY+y2) + distance(graphX + w*0.4, graphY+y2, graphX + w*0.4, graphY+y3) + distance(graphX + w*0.4, graphY+y3, tx, ty);

    shortest1 = min(dis1, dis2, dis3);
    shortest2 = min(dis4, dis5, dis6);
    shortest = min(shortest1, shortest2);

      

    if(shortest == dis1){
    line(x, y, graphX + w*0.47, graphY+y2);
    line(graphX + w*0.47, graphY+y2, graphX + w*0.47, graphY+y3);
    line(graphX + w*0.47, graphY+y3, tx, ty);
    }

    else if(shortest == dis2){
    line(x, y, graphX + w*0.47, graphY+y2);
    line(graphX + w*0.47, graphY+y2, graphX + w*0.49, graphY+y3);
    line(graphX + w*0.49, graphY+y3, tx, ty);
    }

    else if(shortest == dis3){
    line(x, y, graphX + w*0.49, graphY+y2);
    line(graphX + w*0.49, graphY+y2, graphX + w*0.47, graphY+y3);
    line(graphX + w*0.47, graphY+y3, tx, ty);
    }

    else if(shortest == dis4){
    line(x, y, graphX + w*0.49, graphY+y2);
    line(graphX + w*0.49, graphY+y2, graphX + w*0.49, graphY+y3);
    line(graphX + w*0.49, graphY+y3, tx, ty);
    }

    else if(shortest == dis5){
    line(x, y, graphX + w*0.95, graphY+y2);
    line(graphX + w*0.95, graphY+y2, graphX + w*0.95, graphY+y3);
    line(graphX + w*0.95, graphY+y3, tx, ty);
    }

    else if(shortest == dis6){

    line(x, y, graphX + w*0.4, graphY+y2);
    line(graphX + w*0.4, graphY+y2, graphX + w*0.4, graphY+y3);
    line(graphX + w*0.4, graphY+y3, tx, ty);
    }



   }


    
   else 
   {
    line(x, y, tx, ty);
       shortest = distance(x, y, tx, ty);
   }
    


  strokeWeight(12);
  point(x, y);
  point(tx, ty);
    
    
  strokeWeight(2);
    
}











