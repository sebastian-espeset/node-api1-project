//define the server
const server = require('./api/server');

//import express framework for routing etc.
const express = require("express");

//import the generate function from shortId
const generate = require("shortid").generate;

//define app as express, don't know why...
const app = express();
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
app.get('/users',(req, res)=>{
    res.status(200).json(users)
});

app.listen(port, ()=>{
    console.log(`server running at port: ${port}`)
});


