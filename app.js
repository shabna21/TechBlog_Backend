const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const jwt = require('jsonwebtoken')
const Studentdata = require('./src/models/Studentdata');
const Blogdata = require('./src/models/Blogdata')
const Admindata = require('./src/models/Admindata');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/stregister',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var student = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }  
    Studentdata.findOne({email: student.email})
    .then(function(stdata){
        if (stdata == null){
            var stregister = Studentdata(student);
            stregister.save(); 
            res.status(200).send('success');
        }
        else{
            res.status(401).send('email already exist');
          }
    })        
});

app.post('/stlogin', (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    let student = req.body
    Studentdata.findOne({email: student.email})
    .then(function(stdata){
        if (stdata == null){
            res.status(401).send('Invalid email')
        }
        else if(stdata.password == student.password){
            let payload = {subject: stdata.email+stdata.password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token,stdata})
        }
        else{
            res.status(401).send('Invalid Password')
        }
    })
})

app.post('/saveblog',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var blog = {
        writerid: req.body.writerid,
        title: req.body.title,
        writer: req.body.writer,
        about: req.body.about,
        content: req.body.content,
        approve: req.body.approve
    } 
    var blogsave = Blogdata(blog);
    blogsave.save(); 
    res.status(200).send('success');        
});

app.get('/blogs',function(req,res){
    Blogdata.find({approve: true})
    .then(function(blog){
        res.send(blog);
    })
});

app.get('/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const id = req.params.id;
    Blogdata.findOne({_id: id})
    .then(function(blog){
        res.send(blog);
    })        
});
app.get('/blog/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const id = req.params.id;
    Blogdata.find({writerid: id,approve: false})
    .then(function(blog){
        res.send(blog);
    })        
});
app.get('/approveblog/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const id = req.params.id;
    Blogdata.find({writerid: id,approve: true})
    .then(function(blog){
        res.send(blog);
    })        
});

app.get('/update/:id',(req,res)=>{
    const id = req.params.id;
    Blogdata.updateOne({"_id":id},{$set:{"approve": true}})
    .then(function(){
        res.status(200).send('updated');
    })
})

// Admin
app.post('/adregister',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }  
    Admindata.findOne({email: admin.email})
    .then(function(addata){
        if (addata == null){
            var adregister = Admindata(admin);
            adregister.save(); 
            res.status(200).send('success');
        }
        else{
            res.status(401).send('email already exist');
          }
    })        
});

app.post('/adlogin', (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    let admin = req.body
    Admindata.findOne({email: admin.email})
    .then(function(addata){
        if (addata == null){
            res.status(401).send('Invalid email')
        }
        else if(addata.password == admin.password){
            let payload = {subject: addata.email+addata.password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token,addata})
        }
        else{
            res.status(401).send('Invalid Password')
        }
    })
})
app.get('/all/blogs',function(req,res){
    Blogdata.find({approve: false})
    .then(function(blog){
        res.send(blog);
    })
});

app.delete('/remove/:id',(req,res)=>{
    id = req.params.id;
    Blogdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
  })

  app.put('/updateblog',(req,res)=>{
    id=req.body._id,
    writerid= req.body.writerid,
    title= req.body.title,
    writer= req.body.writer,
    about= req.body.about,
    content= req.body.content,
    approve= req.body.approve
    Blogdata.findOneAndUpdate({"_id":id},
                                {$set:{"writerid": writerid,
                                    "title": title,
                                    "writer": writer,
                                    "about": about,
                                    "content": content,
                                    "approve": approve}})
   .then(function(){
       res.status(200).send('upadted');
   })
 })

app.listen(port,()=>{console.log("Server ready at "+ port);});