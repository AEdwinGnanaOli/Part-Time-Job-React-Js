const { SignUp, VendorSignUp, Login, Forgot, Reset, ProductRegister, ProductFullDetails, ProductUpdate, ProductDelete, vendorUpdate, userUpdate, getProductsDetails, getUserAndVendorDtails, } = require('../Controllers/AuthuController');
const { UserCart, UserCartDisplay, UserCartDelete, VendorCart, VendorCartDisplay } = require('../Controllers/Cart');
const { userDetails, vendorDetails, vendorProductsDetails, VendorDelete, userDelete, adminVendorProductDelete, userLoginDetails, vendorLoginDetails, deleteLoginDetails, adminProductSignIn } = require('../Controllers/admin');
const { userVerification, vendorVerification, adminVerification, } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router()
const multer = require('multer')
const path = require('path');
const { Likes,LikeDetails } = require('../Controllers/likes');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})


router.post('/userRegister', SignUp);
router.post('/vendorregister', VendorSignUp);
router.post("/productregister/:vendorId", upload.single('file'), ProductRegister);
router.post('/login', Login);
router.post('/', userVerification);
router.post('/vendordetails', vendorVerification);
router.post('/forgotpassword', Forgot);
router.post('/resetpassword/:id/:token', Reset);
router.get('/productfulldetails/:id/:token', ProductFullDetails);
router.get('/getproductdetails/:id', getProductsDetails);
router.put('/productupdate/:id', upload.single('file'), ProductUpdate);
router.delete('/vendorproductdelete/:id', ProductDelete);
router.post('/usercart/:userId/:vendorId/:id', UserCart);
router.get('/usercartdisplay/:userId/:token', UserCartDisplay);
router.delete('/usercartdelete/:id/:vendorId', UserCartDelete);
router.post('/userdetails/:userId/:vendorId/:id', VendorCart);
router.get('/vendorcartdetails/:vendorId/:token', VendorCartDisplay);
router.post('/adminhome', adminVerification);
router.get('/admin/userdetails', userDetails);
router.get('/admin/vendordetails', vendorDetails);
router.get('/admin/vendorproductdetails', vendorProductsDetails);
router.delete('/vendor/delete/:id', VendorDelete)
router.delete('/admin/vendorproductdelete/:id', adminVendorProductDelete)
router.get('/getuser/vendor/details/:id', getUserAndVendorDtails)
router.put('/user/update/:id', userUpdate)
router.delete('/user/delete/:id', userDelete)
router.put('/vendor/update/:id', vendorUpdate)
router.get('/login/userdata',userLoginDetails)
router.get('/loginvendordata', vendorLoginDetails)
router.delete('/deletedetails/:id', deleteLoginDetails)
router.post('/like/:userId/:vendorId',Likes)
router.get('/getlike/:userId',LikeDetails)
module.exports = router;