const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const User=require('../models/user');
const express = require("express");
const router=express.Router();

//exports.signup=
router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash =>{
        const user =new User({
            email:req.body.email,
            password:hash
        });
        user.save()
            .then(result =>{
                res.status(201).json({
                    message:"User created!",
                    result:result
                });
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                });
            })
    })
});
//exports.login=
router.post("/login",(req,res,next)=>{
    let fetcheduser;
    User.findOne({email:req.body.email})
    .then(user =>{
        if(!user){
            return res.status(401).json({
                message:"Authentication Failed: User not found"
            })
        }
        fetcheduser=user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message:"Authentication Failed: Password did not match"
            })
        }
        //if password matches create jwt and attach to the response
        const token=jwt.sign(
            {email:fetcheduser.email, userId:fetcheduser._id },
            "secret_this_should_be_longer",
            {expiresIn:"1h"}
        );
        res.status(200).json({
            token:token,
            expiresIn:3600
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message:"Authentication Failed"
        })
    });
});
module.exports=router;