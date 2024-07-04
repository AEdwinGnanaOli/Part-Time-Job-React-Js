const mongoose = require('mongoose')

const VendorSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    image:String,
    role:String,
    
})
  
 

const Vendormodel= mongoose.model('vendorData',VendorSchema, "usersData")

module.exports=Vendormodel