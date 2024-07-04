const UserModel = require('../Models/UserMoldel')
const Vendormodel = require('../Models/VendorModel')
const ProductModel = require('../Models/ProductModel')
const UserCart = require('../Models/UserCart')
const VendorCart = require('../Models/VendorCart')
const { createSceretToken } = require('../Util/SecretToken');
const jwt = require('jsonwebtoken')

module.exports.UserCart = async (req, res, next) => {
    try {
        const { userId,vendorId,id} = req.params
        const product = await ProductModel.findOne({ _id: id}) 
        const userCart = await UserCart.create({ userId: userId, ProductId:vendorId, shopname: product.shopname, shopaddress: product.shopaddress, shopmobilenumber: product.shopmobilenumber, image: product.image })
        const token = createSceretToken(userId)
        res.cookie('token', token)
        res.json({ message: 'Add to Cart Successfully', userCart})
        next()
    } catch (err) {
        console.log(err)
    }
    
}
module.exports.UserCartDisplay = async (req, res) => {
    try {
        const { userId, token } = req.params
        if (!token) {
            return res.json({ message: "not token" })
        }
        jwt.verify(token, "jwt_secret_key", async (err, dcoded) => {
            if (err) {
                return res.json({ message: 'token missing' })
            } else {
                const userCart = await UserCart.find({ userId: userId })
                if (userCart) {
                    res.json({ message: 'Product Find Successfully', userCart })
                } else {
                    return res.json({ message: 'User not Found' })
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports.UserCartDelete = async (req, res, next) => {
    try {
        const {id,vendorId} = req.params;
        const UserCartDelete = await UserCart.findOneAndDelete ({ userId: id })
        const vendorCartDelete=await VendorCart.deleteMany({vendorId})
        res.json({ message: 'Product Delete Successfully', UserCartDelete })
        next()
    } catch (err) {
        res.json(err)
    }
}
module.exports.VendorCart=async(req,res)=>{
    try{
        const { userId,id,vendorId} = req.params
        const userDetails = await UserModel.findById({ _id:userId})
        const vendorCart = await VendorCart.create({userId:userId, vendorId:vendorId,name:userDetails.name,email:userDetails.email,phone:userDetails.phone})
        const token = createSceretToken(id)
        res.cookie('token', token)
        res.json({ message: 'Add to Cart Successfully', vendorCart })
    }catch(err){
        console.log(err)
    }
}
module.exports.VendorCartDisplay = async (req, res) => {
    try {
        const { vendorId, token } = req.params
        if (!token) {
            return res.json({ message: "not token" })
        }
        jwt.verify(token, "jwt_secret_key", async (err, dcoded) => {
            if (err) {
                return res.json({ message: 'token missing' })
            } else {
                const vendorCart = await VendorCart.find({ vendorId: vendorId })
                if (vendorCart) {
                    res.json({ message: 'Product Find Successfully', vendorCart })
                } else {
                    return res.json({ message: 'User not Found' })
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}