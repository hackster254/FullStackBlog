const mongoose = require('mongoose')

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
const blogSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        title: {
            type: 'string',
            required: true
        },
        content: {
            type: 'string',
            required: true
        },
        image: {
            type: 'string',
            required: true
        },
        category: {
            type: 'string',
            default: 'others'
        },
        createdAt: {
            type: 'string',
            default: new Date().toLocaleDateString('en-Us')
        }
    }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog