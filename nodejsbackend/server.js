const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
require('./connection')
const userRoutes = require('./routes/userRoutes')

const blogRoutes = require('./routes/blogRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/users', userRoutes)
app.use('/blogs', blogRoutes)

app.listen(5000, ()=> {
    console.log('server is running on port 5000')
})