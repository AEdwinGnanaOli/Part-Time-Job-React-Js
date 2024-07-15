const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser=require('cookie-parser')
const app = express()
app.use(cors({
    origin: ['https://beautiful-genie-4db327.netlify.app'],
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