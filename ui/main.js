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
b2.onclick=function()
{
    var name=document.getElementById("i1");
    var name1=name.value;
    var er=new XMLHttpRequest();
    er.onreadystatechange=function()
    {
        if(er.readyState==XMLHttpRequest.DONE)
        {
            if(er.status==200)
            {
                var list1=document.getElementById('namelist');
                var response=er.responseText;
                var response1=JSON.parse(response);
                list1.innerHTML+='<li>'+response1+'</li>';
                                 
            }
            
        }
    };
    er.open('GET','http://divyanshagrawal96.imad.hasura-app.io/submit?name='+name1,true);
    er.send(null);
    
    /*var names=['name1','name2','name3'];
    var list="";
    for(var i=0;i<names.length;i++)
    {
        list+='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    namelist.innerHTML=list;*/
    
};