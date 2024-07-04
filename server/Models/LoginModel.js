const mongoose = require('mongoose')


const LoginSchema = new mongoose.Schema({
    UserId:String,name:String,email: String, password: String,
    lastLoginDate: String,
    lastLogintime:String,
    role:String
})
  
const LoginModel = mongoose.model("LoginData", LoginSchema)

module.exports=LoginModel