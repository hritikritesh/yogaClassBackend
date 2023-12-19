const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Jwt_secret} = require("../keys");

router.get('/',(req,res)=>{
    res.send('hello');
})

router.post("/signup",(req,res) => {
    const {name,email,dateOfBirth,password} = req.body;
    if(!name || !email || !dateOfBirth || !password)
    {
        return res.status(422).json({error: 'Please add all the field'});
    }

    // $or:[{email:email},{userName:userName}] syntax to check occurence of already existing email and userName
    USER.findOne({email:email}).then((savedUser)=> {
        if(savedUser)
        {
            return res.status(422).json({error:"User already exist with that email"})
        }
        // to encrypt passsword
        bcrypt.hash(password,12).then(((hashedPassword)=>{
            const user = new USER(
                {
                    name,
                    email,
                    dateOfBirth,
                    password: hashedPassword
                }
            );
            user.save()
            .then(user => {res.json({message: "User saved successfully"})})
            .catch(err => {console.log(err)});
        }))
    })

})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(422).json({error: 'Please add email and password'});
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error: 'User not registered'});
        }
        bcrypt.compare(password, savedUser.password)
        .then((match)=>{
            if(match)
            {
                // return res.status(200).json({message: "Signed In successfully"});
                const token = jwt.sign({_id:savedUser.id},Jwt_secret)
                console.log(token);
                res.json(token);
            }
            else{
                return res.status(422).json({error: "Password not matched"});
            }
        })
        .catch(err=>console.log(err));
    })
})

module.exports = router;