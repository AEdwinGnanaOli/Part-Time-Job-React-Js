const mongoose=require('mongoose')

const  productSchema= new mongoose.Schema({
    userId:String,
    ProductId:String,
    shopname:String,email:String,shopmobilenumber:Number,shopaddress:String,image:String
})

const CartModel = mongoose.model("UserCart", productSchema)

module.exports=CartModel