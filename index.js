//define the server
const server = require('./api/server');

//import express framework for routing etc.
const express = require("express");

//import the generate function from shortId
const generate = require("shortid").generate;

//define app as express, don't know why...
const app = express();
const port = 5000;


// START YOUR SERVER HERE
app.listen(port, ()=>{
    console.log(`server running at port: ${port}`)
})
