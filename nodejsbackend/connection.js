const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect( `mongodb+srv://origin:${process.env.DB_PASS}@cluster0.usfpd.mongodb.net/users?retryWrites=true&w=majority`, ()=>{
    console.log('connected to mongodb')
})
