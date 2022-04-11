const mongoose=require("mongoose");
const pictureSchema=mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    imagePath: {type:String, required:true}
});
module.exports=mongoose.model("Picture",pictureSchema);