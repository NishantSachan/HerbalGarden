const Product=require('../models/productModel');
const express = require("express");
const router=express.Router();
const checkAuth=require("../middleware/check-auth");
//exports.getAllProducts=
router.get("",(req,res,next)=>{
    Product.find({}).exec().then((productData) => {
            res.status(200);
            res.send(productData);
    })
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/ ID doesn't exists- Information",+error.message);
    })
    .then(()=>console.log("promise complete"));
});
//exports.getProductById=
router.get("/:productId",(req,res,next)=>{
    pId=req.params.productId;
    Product.findOne({id: {$gte:pId} }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.send(docs);
        }
    });
})
//exports.partialUpdate=
router.patch("/:productId",checkAuth,(req,res,next)=>{
    pId=req.params.productId;
    Product.findOneAndUpdate({id: {$gte:pId} }, req.body).exec().then(data=>{
        if (!data) {
                return res.status(404).send();
            }
        res.send(data);
    })
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    .then(()=> console.log("promise completed for update"));
})
//exports.deleteProduct=
router.delete("/:productId",checkAuth,(req,res,next)=>{
    let pId=req.params.productId;
    Product.deleteOne({id:{$gte:pId}}).then(function(){data=>{
        res.send(data)
    }})
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    .then(()=> console.log("promise completed for delete"));
})
//module.exports.createProduct=
router.post("",checkAuth,(req,res,next)=>{
    let product=req.body;
    Product.create(product).then(data=>{
        res.status(201);
        res.send(data)
    })

    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    .then(()=> console.log("promise completed for create"));
})

module.exports=router;