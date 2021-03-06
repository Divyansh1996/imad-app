var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

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
    var date=data.date;
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
          ${date}
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
app.use(bodyParser.json());
app.use(session({
    secret:'Some Random Secret Values',
    cookie:{maxAge:1000*60*60*24*30}
}));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt)
{
    var hased=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hased.toString('hex')].join('$');
}
app.post('/create-user',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User Login Successful'+username);
        }
    });
});
app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    pool.query('select * from "user" where username=$1',[username],function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.send(403).send('username invalid');
            }
            else
            {
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashpassword=hash(password,salt);
                if(hashpassword==dbString)
                {
                    req.session.auth={userId:result.rows[0].id};
                    res.send('creditentials correct');
                }
                else
                {
                    res.status(403).send('invalid login');
                }
            }
        }
    });
});
app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId)
    {
        res.send('You are Logged in'+req.session.auth.userId.toString());
    }
    else
    {
        res.send("You Are Not Logged in");
    }
});
app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('Logged Out');
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
    
    pool.query("select * from article where title=$1",[req.params.articleName], function(err,result){
        
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
                res.send(createtemplate(articleData));
            }
        }
    });
    
});

app.get('/test-db/:input',function(req,res){
   var hasedString=hash(req.params.input,'this-is');
    res.send(hasedString);
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
