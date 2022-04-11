const express = require('express');
const router=express.Router();
const multer=require('multer');
const Picture = require('../models/picture');
const { post } = require('./productController');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg' : 'jpg'
}
//configure multer 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid){
            error=null
        }
        cb(error,"./images")   },
        filename:(req,file,cb)=>{
    const name=file.originalname
    .toLocaleLowerCase()
    .split(' ')
    .join('-');
    const ext=MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+'-'+ext);
    }

})//configure route for file upload

router.post(
    "",
    multer({storage:storage}).single('image'),
     (req,res,next) =>{
    console.log("From Multer",req.body.title);
const url= req.protocol+"://"+req.get("host");    
    const pic=new Picture({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+"/images"+req.file.filename
    });
    console.log("File Url",pic['imagePath']);
    pic.save().then(createPic =>{
        res.status(201).json({
            message:"Picture added successfully !",
            pic:{
                ...createPic,
                id:createPic._id
            }
        });
        console.log()
    })
    .catch(err=>{
        console.log("Error ")
        res.status(500).json({
            error:err
        });
    });
})

module.exports=router;