const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.listen(port,()=>{
    console.log('listening on port',port);
});

let posts = [
    {
        username: "IbrahimAli",
        content: "I currently learning the web developing course",
    },
    {
        username: "IsmailAli",
        content: "I currently a student",
    },
    {
        username: "HasanAli",
        content: "I currently working in kuwait",
    }
]

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})
app.get('/posts/new',(req,res)=>{
   res.render('new.ejs') 
})
app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
})
