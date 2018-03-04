
// Get the modal
var modal = document.getElementById('myModal');
var reModal = document.getElementById('reModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var renameBut = document.getElementById("reB");

reB.onclick=function(){
    shapeMode="undefined";
    reModal.style.display = "block";
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    shapeMode="undefined";
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    reModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == reModal) {
        reModal.style.display = "none";
    }
}
function mouseUp(thisOb) {
    thisOb.parentElement.style.display="none";
}
function mouseOut() {
    var uls = document.getElementsByClassName("dropdown2");
    for(var i=0;i<uls.length;i++){
        uls[i].style.display="none";
    }
}
function hov(thisOb){
    //var list = thisOb.parent.childNodes;
    var list=thisOb.parentNode.childNodes
    var thisObj;
    for (var i = 0; i < list.length; i++) {
        if(hasClass(list[i],"dropdown2")){
    list[i].style.display="block";
        thisObj=list[i];
        }
}
    var uls = document.getElementsByClassName("dropdown2");
    for(var i=0;i<uls.length;i++){
        if(uls[i] != thisObj){
        uls[i].style.display="none";}
    }
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}