const router = require('express').Router()

const Blog = require('../models/blogModel')

const authUser = require('../middlewares/authMiddleware')

//create article
router.post('/', authUser, async(req,res)=>{
    const {title, image,content,category} = req.body

    try {
        const article = await Blog.create({title,image,category, content,
        creator: req.user._id // comes from authUser
        })

        req.user.articles.push(article._id)
        await req.user.save()
        res.status(200).json(article)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
})

// getting all articles
router.get('/', async (req,res)=> {
    try {
        
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(404).json(error.message)
        
    }
})

//get users articles specifi
router.get('/me', authUser, async(req,res)=>{
    try {
        const user = await req.user
        console.log("user is: ", user)

        user.populate('articles').then(({articles})=> {
            console.log('your articles are: ', articles)
            res.status(200).json(articles)

        })
    } catch (error) {
        res.status(404).json({bad: 'not working', error})
        
        
    }
})

//get single articles
router.get('/:id', async(req,res)=> {
    const {id} = await req.params
    try {
        const blog = await Blog.findById(id)
        console.log('blog is: ',blog)
        blog.populate('creator').then(result => res.status(200).json(result))
    } catch (error) {
        res.status(404).json("Not found")
        
    }
})

// to delete single article
router.delete('/:id', authUser, async(req,res)=> {
    const {id} = req.params
    try {
        const article = await Blog.findById(id)
        if(article.creator.toString()=== req.user._id.toString()){

            await article.remove()
            res.status(200).json('Removed the article successfully')

        } else{
            res.status(401).json('You dont have the right permissions')
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})


//to update article
router.patch('/:id', authUser, async(req,res)=>{
    const {id} = req.params
    const {title, content} = req.body
    try {
        const article = await Blog.findByIdAndUpdate(id, {title, content})

        res.status(200).json('article updated')
        
    } catch (error) {
        res.status(400).json(error.message)
        
    }
})

module.exports = router