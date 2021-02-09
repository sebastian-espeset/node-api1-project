//define the server
const server = require('./api/server');

//import express framework for routing etc.
const express = require("express");

//import the generate function from shortId
const generate = require("shortid").generate;

//define app as express, don't know why...
const app = express();

//app.use??? Dont know why...
app.use(express.json());

const port = 5000;

//dummy data
const users=[
    {
        id:generate(),
        name:"Sebastian",
        bio:"some music and coding stuff"
    },
    {
        id:generate(),
        name:"Jake",
        bio:"some songwriting stuff"
    },
    {
        id:generate(),
        name:"Al",
        bio:"some poetry stuff"
    },
    {
        id:generate(),
        name:"Jessica",
        bio:"some therapy stuff"
    }
]

// START YOUR SERVER HERE
//axios.get
app.get('/users',(req, res)=>{
    res.status(200).json(users)
});
//axios.post
app.post('/users',(req,res)=>{
    //destructure the body requirement
    const { name, bio} = req.body;
    //if they ARE NOT included in the post, send error message
    if(!name || !bio){
        res.status(400).json({message:`Error, must include both name and bio`})
    }
    //if name and bio are included, post to server and return the new server, include status 201 i.e created a resource successfully
    else{
        const newUser={id:generate(),name, bio};
        users.push(newUser);
        res.status(201).json(users);
    }
})

app.listen(port, ()=>{
    console.log(`server running at port: ${port}`)
});


