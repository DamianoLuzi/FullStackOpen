const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
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

blogsRouter.post('/', (request, response) => {
    //console.log("request",request)
    console.log("request.body ",request.body)
    const body = request.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0
	})
    
	blog
    .save()
    .then(result => {
        console.log("saved result ",result)
        response.status(201).json(result)
    })
})

module.exports = blogsRouter