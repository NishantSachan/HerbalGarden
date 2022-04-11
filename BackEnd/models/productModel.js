const mongoose=require("mongoose");
const{Schema}=mongoose;
const productModel=new Schema({
    id:{type:Number,required:true},
    productName:{type:String,required:true},
    productCode:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    tags:{type:[]},
    imageUrl:{type:String},
    releaseDate:Date,
    starRating:{type:Number,required:true}
    }
)

module.exports=mongoose.model('Product',productModel);