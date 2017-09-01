var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'divyanshagrawal96',
    database:'divyanshagrawal96',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

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
    var body=data.content;
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

/*var articles={
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
    
};*/

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
  names.push(name);
 res.send(JSON.stringify(names));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js',function(req,res)
{
 res.sendFile(path.join(__dirname,'ui','main.js'));   
});
var pool=new Pool(config);
app.get('/articles/:articleName',function(req,res){
    
    pool.query("select * from article where title='" + req.params.articleName + "'",function(req,res){
        
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(404).send("Not Found");
            }
            else
            {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    
});

app.get('/test-db',function(req,res){
   pool.query("select * from test",function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result.rows));
       }
   }); 
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
