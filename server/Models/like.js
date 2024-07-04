const mongoose=require('mongoose')

const likeSchema= new mongoose.Schema({
    userId:String,
    vendorId:String,
    liked:Boolean
    
})
const likeModel=mongoose.model('likes',likeSchema);


module.exports=likeModel