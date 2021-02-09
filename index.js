//define the server
const server = require('./api/server');

//import express framework for routing etc.
const express = require("express");

//import the generate function from shortId
const generate = require("shortid").generate;

//define app as express, don't know why...
const app = express();

//app.use??? Dont know why but that fixed the post request
app.use(express.json());

const port = 5000;

//dummy data
let users=[
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
//axios.get, to return the dummy data
app.get('/users',(req, res)=>{
    res.status(200).json(users)
});

//axios.post, adds a user to the api
app.post('/users',(req,res)=>{
    //destructure the body requirement
    const { name, bio} = req.body;
    //if they ARE NOT included in the post, send error message
    if(!name || !bio){
        res.status(400).json({message:`Error, must include both name and bio`})
    }
    //if name and bio are included, post to api and return the new array, include status 201 i.e created a resource successfully
    else{
        const newUser={id:generate(),name, bio};
        users.push(newUser);
        res.status(201).json(users);
    }
})

//Return a specific user using id.params
app.get('/users/:id',(req,res)=>{
    //define the id of the user you want to find
    const userId = req.params.id;

    //define the user using the array method .find and the specific user id
    const foundUser = users.find(user=>user.id===userId)

    //if the userId does not exist, return 404
    if(!foundUser){
        res.status(404).json({message:`no user exists with id: ${userId}`});
    } 
    //if the id is a positive match, return that user
    else{
        res.status(200).json(foundUser);
    }
    
})

//Delete a specific user using the method as find, only using the CRUD op delete
//use try and catch.. but why?

app.delete('/users/:id',(req, res)=>{
    const userId = req.params.id;

    try{
        //test if the user with that id exists, if not...
        if(!users.find(user=>user.id===userId)){
            res.status(404).json({message:`User id, ${userId}, not found`})
        }//if so return a new array filtering out that user
        else{
            users = users.filter(user=>user.id !==userId)
            res.status(200).json({message:`User ${userId} was deleted`,users})
        }
    }
    /*return status 500, a generic catch all status... "something went wrong" */ 
    catch(e){
        res.status(500).json({message:`Error:${e}`})
    }
})



app.listen(port, ()=>{
    console.log(`server running at port: ${port}`,users)
});


