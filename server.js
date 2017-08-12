var express = require('express');
var morgan = require('morgan');
var path = require('path');
var articleOne={
    title:'Article Kanha',
    heading:'Thts me',
    body:` <p>this is my first article.n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be: </p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>`
};
function createtemplate(data){
    var title=data.title;
    var heading=data.heading;
    var body=data.body;
var htmltemplate=
`<html>
    <head>
        <title>${title}</title>
    </head>
    <body>
        <h1>
            ${heading}
        </h1>
        <hr/>
          ${body}
    </body>
</html>`;
return htmltemplate;
}

var articles={
    'article-one':{
    title:'Article Kanha1',
    heading:'Thts me',
    body:` <p>this is my first article.n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be: </p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>`
    },
    'article-two':{
    title:'Article Kanha2',
    heading:'Thts me',
    body:` <p>this is my first article.n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be: </p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>`
    },
    'article-three':{
        
    title:'Article Kanha3',
    heading:'Thts me',
    body:` <p>this is my first article.n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be: </p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>
        <p>n alloy contains zinc, copper and tin in the ratio 2:3:1 and another contains copper, tin and lead in the ratio 5:4:3. If equal weights of both alloys are melted together to form a third alloy, then the weight of lead per kg in new alloy will be:</p>`
    }
    
};

var app = express();  
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function(req,res)
{
 counter=counter+1;
 res.send(counter.toString());
});
var names=[];
app.get('/submit',function(req,res)
{
 var name=req.query.name;

 res.send(JSON.stringify(name));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js',function(req,res)
{
 res.sendFile(path.join(__dirname,'ui','main.js'));   
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/:articleName',function(req,res)
{
    
    var articleName=req.params.articleName;
    res.send(createtemplate(articles[articleName]));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
