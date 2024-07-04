const UserModel = require('../Models/UserMoldel')
const Vendormodel = require('../Models/VendorModel')
const ProductModel = require('../Models/ProductModel')
const { createSceretToken } = require('../Util/SecretToken');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');
const LoginModel = require('../Models/LoginModel');

module.exports.SignUp = async (req, res, next) => {
    try {
        const { name, email, phone, password, role } = req.body
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json({ message: "User already exists" })
        }
        const user = await UserModel.create({ name, email, phone, password, role })
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.json({ message: "User Sign Successfully", Status: "Success", user })
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports.VendorSignUp = async (req, res, next) => {
    try {
        const { name, email, phone, password, role } = req.body;
        const existingUser = await Vendormodel.findOne({ email })
        if (existingUser) {
            return res.json({ message: "User already existed" })
        }
        const vendor = await Vendormodel.create({ name, email, password, phone, role });
        const token = createSceretToken(vendor._id);
        res.cookie('token', token);
        res.json({ message: "User Sign Successfully", Status: 'Success', vendor });
        next()
    } catch (err) {
        console.log(err)
    }
}
module.exports.ProductRegister = async (req, res, next) => {
    try {
        const { vendorId } = req.params
        const { shopname, email, shopmobilenumber, shopaddress, starttime, endtime, work, price, role } = req.body
        const product = await ProductModel.create({ ProductId: vendorId, shopname, email, shopmobilenumber, shopaddress, starttime, endtime, work, price, image: req.file.filename, role })
        res.json({ message: 'Product Signup Successfully', Status: 'Success', product })
        next()
    } catch (err) {
        console.log(err)
    }
}
module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const date = new Date()
        const correntTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes()
        const correntDate =new Date().toJSON().slice(0, 10)
        const Login = await LoginModel.create({ UserId: user._id, password: password,name:user.name, email: email, lastLoginDate:correntDate, lastLogintime: correntTime,role:user.role })
        if (!user) {
            return res.json({ message: 'User Not Found' })
        }
        const auth = await password === user.password
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
        })
        res.status(201).json({ message: 'Login Successfully', Status: "Success", success: true, user, token })
        next()
    } catch (err) {
        console.log(err)
        res.json({ message: err.message })
    }
}
module.exports.Forgot = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            res.json({ message: "User no existed" })
        }
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'edwina6933@gmail.com',
                pass: 'syij roef dpmc ngpk'
            }
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: user.email,
            subject: 'Sending Email using Node.js',
            text: `http://localhost:5173/resetpassword/${user._id}/${token}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.Reset = async (req, res, next) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body
        if (!token) {
            return res.json({ message: "token missing" })
        }
        jwt.verify(token, 'jwt_secret_key', async (err, decode) => {
            if (err) {
                return res.json({ message: "invalid token" })
            } else {
                
                    UserModel.findByIdAndUpdate({ _id: id }, { password: password }).then(user => {
                        return res.json({ message: "The password reset Successfully", user })
                    }).catch(err => {
                        return res.json({ message: "user no exited" })
                    })
                
            }
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports.ProductFullDetails = async (req, res) => {
    try {
        const { id, token } = req.params
        if (!token) {
            return res.json({ message: "not token" })
        }
        jwt.verify(token, "jwt_secret_key", async (err, dcoded) => {
            if (err) {
                return res.json({ message: 'token missing' })
            } else {
                const vendorProductDetails = await ProductModel.findOne({ _id: id })
                if (vendorProductDetails) {
                    return res.json({ message: 'Product Find Successfully', vendorProductDetails })
                } else {
                    return res.json({ message: 'User not Found' })
                }
            }
        })

    } catch (err) {
        console.log(err)
    }

}

module.exports.getProductsDetails=async(req,res,next)=>{
    try {
        const{id}=req.params
        const pdls= await  ProductModel.findById({_id:id})
        res.json({ message: 'Product Details Found Successfully',pdls })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.ProductUpdate = async (req, res, next) => {
    try {
        const { id } = req.params
        const { shopname, email, shopmobilenumber, shopaddress, starttime, endtime, price,work ,} = req.body
        const product = await ProductModel.findByIdAndUpdate({ _id: id }, { shopname: shopname, email: email, shopmobilenumber: shopmobilenumber, shopaddress: shopaddress, starttime: starttime, endtime: endtime, price: price, work, image: req.file.filename, })
        const vendorEmailUpdate = await Vendormodel.findByIdAndUpdate({ _id: product.ProductId }, { email: email })
        
        if (product) { res.status(200).json({ message: 'Product update Successfully', product,vendorEmailUpdate }) }
        else { return res.json({ message: 'not found' }) }
        next()
    } catch (err) {
        console.log(err)
    }

}
module.exports.ProductDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productDelete = await ProductModel.findByIdAndDelete({ _id: id })
        res.json({ message: 'Product Delete Successfully', productDelete })
        next()
    } catch (err) {
        res.json(err)
    }
}

module.exports.getUserAndVendorDtails=async(req,res,next)=>{
    try {
        const{id}=req.params
        const udls = await UserModel.findById({ _id: id })
        const vdls= await  Vendormodel.findById({_id:id})
        res.json({ message: 'Product Details Found Successfully',udls,vdls })
        next()
    }catch(err){
        console.log(err)
    }
}
module.exports.userUpdate = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, email, phone, } = req.body
        const details = await UserModel.findByIdAndUpdate({ _id: id }, { name: name, email: email, phone: phone })
        if (details) { res.status(200).json({ message: 'Details Update Successfully', details }) }
        else { return res.json({ message: 'not found' }) }
        next()
    } catch (err) {
        console.log(err)
    }

}
module.exports.vendorUpdate = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, email, phone, } = req.body
        const details = await UserModel.findByIdAndUpdate({ _id: id }, { name: name, email: email, phone: phone })
        const productDetails = await ProductModel.updateMany({ ProductId: id }, { email: email })
        if (details) { res.status(200).json({ message: 'Details Update Successfully', details, productDetails }) }
        else { return res.json({ message: 'not found' }) }
        next()
    } catch (err) {
        console.log(err)
    }

}


