const router = require('express').Router()

const User = require('../models/userModel')

const authUser = require('../middlewares/authMiddleware')

// create a user
router.post('/',async (req,res)=>{

    const {email, password} = req.body
    try {
        const user = await User.create({email, password})
        const token = await user.generateAuthToken()

        res.status(200).json({user, token})
        
    } catch (error) {
        let msg 
        if(error.code == 11000){
            msg = 'email already exist'
        }
        else {
            msg = error.message
        }
        res.status(400).json(msg)
        
    }


})

// login
router.post('/login', async (req,res)=> {
    const {email, password} =  req.body
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()

        res.status(200).json({user, token})
    } catch (error) {
        res.status(404).json(error.message)
        
    }
})

//logout route
router.delete('/logout',authUser, async(req,res)=> {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj)=> {
            return tokenObj.token !==req.token
            // we are deleting the token
        })
        await req.user.save()
        res.status(200).json({message: 'user logged out backend'})
    } catch (error) {
        res.status(400).json({error: error.message, fail: 'did not work'})
        
    }
})

module.exports = router