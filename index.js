const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4 : uuidv4} = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
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
        id: uuidv4(),
        username: "IbrahimAli",
        content: "I currently learning the web developing course",
    },
    {
        id: uuidv4(), 
        username: "IsmailAli",
        content: "I currently a student",
    },
    {
        id: uuidv4(),
        username: "HasanAli",
        content: "I currently working in kuwait",
    }
]

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})
app.get('/posts/new',(req,res)=>{
   res.render('new.ejs'); 
})
app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((pos)=> id === pos.id);
    res.render('show.ejs',{post});
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((pos)=> id===pos.id); 
    res.render('edit.ejs',{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((pos)=> id === pos.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((pos)=> id!==pos.id);
    console.log(posts)
    res.redirect('/posts');
})      