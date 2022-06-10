// way to make sure who they claim to be

const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const authUser = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'appSecret')

        const user = await User.findOne({
            _id: decoded._id
        })
        if(!user) throw new Error('please authenticate')
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error: 'please authenticate '+error.message})
        
    }
}

module.exports = authUser