const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: String, email: String, phone: String, password: String, role: String
})

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
const UserModel = mongoose.model("userData", UserSchema, "usersData")


module.exports=UserModel