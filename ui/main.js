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
var v1=document.getElementById("b1");
v1.onclick=function()
{
    var re=new XMLHttpRequest();
    re.onreadystatechange=function()
    {
      if(re.readyState==XMLHttpRequest.DONE)
      {
          if(re.status==200)
          {
              var e=document.getElementById("spa");
              var response=re.responseText;
              e.innerHTML=response.toString();
          }
      }
    };
    re.open('GET','http://divyanshagrawal96.imad.hasura-app.io/counter',true);
    re.send(null);
    
};