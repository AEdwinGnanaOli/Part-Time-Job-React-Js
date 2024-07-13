const UserModel=require('../Models/UserMoldel')
const ProductModel=require('../Models/ProductModel')
const LoginModel = require('../Models/LoginModel');
const jwt =require('jsonwebtoken');
const Vendormodel = require('../Models/VendorModel');
const likes=require('../Models/like')


module.exports.userVerification=async(req,res)=>{
  
      const vendorProducts= await ProductModel.find({})
      if (vendorProducts) {return res.json({vendorProducts})}
      else{ return res.json({message:'not found'})}
      
}
module.exports.vendorVerification=(req,res)=>{
  const token=req.cookies.token
  if(!token){
      res.json({ status: false })
  }
  jwt.verify(token,'jwt_secret_key',async(err,data)=>{
      if (err) {
          return res.json({ status: false })
         } else {
           const vendor = await UserModel.findById(data.id)
           const  vendorProduct=await ProductModel.find({email:vendor.email})
           if (vendor) {
            return res.json({ status: true,vendor,vendorProduct})}
           else {return res.json({ status: false })}
         }
       })

}
module.exports.adminVerification=(req,res)=>{
  const token=req.cookies.token
  if(!token){
      return res.json({ status: false })
  }
  jwt.verify(token,'jwt_secret_key',async(err,data)=>{
      if (err) {
          return res.json({ status: false })
         } else {
           const user = await UserModel.findById(data.id)
           if (user) {return res.json({ status: true,user})}
           else {return res.json({ status: false })}
         }
       })
}

