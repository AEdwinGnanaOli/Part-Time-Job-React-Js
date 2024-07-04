const UserModel = require('../Models/UserMoldel');
const Vendormodel = require('../Models/VendorModel');
const ProductModel = require('../Models/ProductModel');
const LoginModel = require('../Models/LoginModel');
module.exports.userDetails = async (req, res, next) => {
    try {
        const userDetails = await UserModel.find({ role: 'user' })
        res.json({ message: 'User Details Found Successfully', userDetails })
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports.vendorProductsDetails=async(req,res,next)=>{
    try{
        const vendorDatas= await  ProductModel.find({role:"VendorProduct"})
        res.json({ message: 'Vendor Product Details Found Successfully',vendorDatas })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.LoginData=async(req,res,next)=>{
    try{
        const LoginData= await LoginModel.find()
    }catch(err){
        console.log(err)
    }
}
module.exports.vendorDetails=async(req,res,next)=>{
    try{
        const vendorDatas= await  Vendormodel.find({role:"Vendor"})
        res.json({ message: 'User Details Found Successfully',vendorDatas })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.VendorDelete = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const vendorDelete = await Vendormodel.findByIdAndDelete({ _id: id })
        const productDelete =await ProductModel.deleteMany({ProductId: id })
        res.json({ message: 'Product Delete Successfully'})
        next()
    } catch (err) {
        res.json(err)
    }
}
module.exports.adminVendorProductDelete = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const productDelete =await ProductModel.deleteOne({ProductId: id })
        res.json({ message: 'Product Delete Successfully'})
        next()
    } catch (err) {
        res.json(err)
    }
}
module.exports.userDelete = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const vendorDelete = await UserModel.findByIdAndDelete({ _id: id })
        res.json({ message: 'Product Delete Successfully'})
        next()
    } catch (err) {
        res.json(err)
    }
}
module.exports.userLoginDetails=async(req,res,next)=>{
    try{
        const userDatas= await  LoginModel.find({role:"user"})
        res.json({ message: 'User Details Found Successfully',userDatas })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.vendorLoginDetails=async(req,res,next)=>{
    try{
        const vendorDatas = await LoginModel.find({ role: "Vendor" })
        console.log(vendorDatas)
        res.json({ message: 'User Details Found Successfully',vendorDatas })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.deleteLoginDetails=async(req,res,next)=>{
    try {
        const { id } = req.params
        console.log(id)
        const Datas= await  LoginModel.deleteMany({UserId:id})
        res.json({ message: 'User Details Found Successfully',Datas })
        next()
    }catch(err){
        console.log(err)
    }
}