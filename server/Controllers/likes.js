const item = require("../Models/like");
const Product = require("../Models/ProductModel");

module.exports.Likes = async (req, res, next) => {
  try {
    const { userId, vendorId } = req.params;
    console.log(userId, vendorId);
    const existinguser=await item.findOne({userId,vendorId})
    if(existinguser){
        await item.deleteOne({userId,vendorId})
        await Product.findByIdAndUpdate(vendorId,{$inc:{likeCount:-1}})
        const likes =await item.updateOne({liked:false})
        const like =await Product.findById(vendorId)
        res.json({message:'UnLiked',likeCount:like.likeCount,status:false,likes})
    }else{
        const likes=await item.create({userId:userId,vendorId:vendorId,liked:true})
        await Product.findByIdAndUpdate(vendorId,{$inc:{likeCount:1}})
        const like= await Product.findById({_id:vendorId})
        res.json({message:'liked',likeCount:like.likeCount,status:true,likes})
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.LikeDetails=async(req,res,next)=>{
    // const{userId}=req.params
    // console.log(userId)
    // const details=await item.find({userId:userId})
    // res.json({message:'Find Successfully',details})
    // next()
}