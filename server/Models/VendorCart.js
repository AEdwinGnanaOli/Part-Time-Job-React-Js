const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const  productSchema= new mongoose.Schema({
    userId:String,vendorId:String,
    name:String,email:String,phone:Number,
})

const CartModel = mongoose.model("VendorCart", productSchema)

module.exports=CartModel