const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const cookieParser=require('cookie-parser')
const app = express()
const {MONGO_URL,PORT}=process.env
app.use(cors({
    origin: ['https://unrivaled-dieffenbachia-37ef96.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
const authRouteUser=require('./Routes/AuthRoute')
app.use(cookieParser());
app.use(express.json())
app.use(express.static('Assets'))


app.use('/',authRouteUser)

mongoose.connect(MONGO_URL).then((result) => {
    console.log('connect to mongoDB')
}).catch((err) => {
    console.log(err)
});
app.listen(PORT, () => {
    console.log(`server is ruinng${PORT}`)
})