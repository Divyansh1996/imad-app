console.log('Loaded!');
var we=document.getElementById('naruto');
var move=0;
function moveRight()
{
    move=move+10;
    we.style.marginRight=move+'px';
}
we.onclick=function(){
  var interval=setInterval(moveRight,100);  
};