const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/",(req,res)=>{
    res.json({
        message: "a sample response"
    })
})

// login api

const secretKey  = "Guru1302"

app.post("/login",(req,res)=>{
    const user = {
        id:1,
        username:"anil",
        email:"abc@gmail.com"
    }

    jwt.sign({user},secretKey,{expiresIn: '300s'},(err,token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({
                message:"access deneied"
            })
        }else{
            res.json({
                message:"Access Granted",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next(); // yeh agle waale function jahan pr use ho rha hai wahan bhej degi iss case mein line number 30 pe chali jaaygei
    }else{
        res.send({
            result:"token is invalid"
        })
    }
}


app.listen(3000,()=>{
    console.log("app is running on port number 3000");
})