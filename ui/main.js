console.log('Loaded!');
var we=document.getElementById('naruto');
var move=0;
function moveRight()
{
    move=move+10;
    we.style.moveRight=move+'px';
}
we.onclick=function(){
  var interval=setInterval(moveRight,100);  
};