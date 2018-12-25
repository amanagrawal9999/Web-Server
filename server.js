const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port =process.env.PORT||3000;
var app=express();

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
      console.log("Unable to log to a file.");
  });
  console.log(log);
  next();
});

app.use((req,res,next)=>{
  res.render('Maintenance.hbs');
});
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
//res.send('<h1>Hello express.</h1>');
res.send({
  name:"abc"
});
});

app.get("/about",(request,response)=>{
  response.render('About.hbs',{
    pageTitle:"About Page",
    pageBody:"lowercase"
  });
})

app.listen(port,()=>{
  console.log("Server is up on "+port);
});
