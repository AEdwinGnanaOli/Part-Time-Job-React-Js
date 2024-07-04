const mongoose=require('mongoose')


const  productSchema= new mongoose.Schema({
    ProductId:String,
    shopname:String,email:String,shopmobilenumber:Number,shopaddress:String,
    starttime:{type:String},
    endtime:String,work:String,price:Number,role:String,image:String,
    likeCount:{
        type:Number,
        default:0 
    },role:String
    
})

const ProductModel = mongoose.model("Products", productSchema)

module.exports=ProductModel