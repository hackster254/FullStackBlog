const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        lowercase: true,
        unique: true,
        required: [true, "Cannot be blank from model"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true

    },
    password: {
        type: 'string',
        required: [true, 'cannot be blank']
    },
    tokens: [],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    // if user is being created or updated
    bcrypt.genSalt(10, function(err,salt){
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err)

            user.password = hash;
            next()
        })
    })
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'appSecret')
    console.log(token)
    user.tokens = user.tokens.concat({token})

    await user.save()
    return token
}
// create method to validate credentials for login
userSchema.statics.findByCredentials = async function(email,password){
    const user = await User.findOne({email});

    if(!user) throw new Error('Unable to login invalid email or password')
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error('invalid email or password')

    // if there is a match
    return user
}

// hide somefields so that they are not exposed in the api
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.articles;
    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User
