const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
    return response.json(blogs)
})

blogsRouter.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

blogsRouter.get('/info', (request, response) => {
	response.send(
		`<p>There are currently </p>
        <br>
        <p>${date}</p>`,
	)
})

blogsRouter.post('/', async (request, response) => {
    console.log("request.body ",request.body)
    const body = request.body
    if(!body || !body.title || !body.author) return response.status(400).json({ error: 'Missing required fields' });
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0
	})
    
	const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get("/:id", async (request,response,next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch {error => next(error)}
})

blogsRouter.put('/:id', async (request, response, next) => {
    console.log("request body",request.body)
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0 ,
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(updatedBlog)
    } catch { error => next(error)}
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter