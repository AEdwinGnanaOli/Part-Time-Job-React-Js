const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String, email: String, phone: String, password: String, role: String
})


  
const UserModel = mongoose.model("userData", UserSchema, "usersData")


module.exports=UserModel