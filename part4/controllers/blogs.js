const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ','')
	}
	return null
}
blogsRouter.get('/', async (request, response) => {
	//populate gets the selected field from the associated user, like a JOIN query
	const blogs = await Blog.find({}).populate('user',{username:1, name:1, url:1, likes:1})
	if(blogs.length === 0) console.log("get('/api/blogs') returns empty array",blogs)
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	//const blog = new Blog(request.body)
	const body = request.body
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if(!decodedToken.id){
		return response.status(401).json({error: 'invalid token'})
	}
	const user = await User.findById(decodedToken.id) 
	console.log("userId",body.userId)
	console.log("user fetched with User.findById",user)

	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user.id
	})

	try {
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
	  response.status(201).json(savedBlog)
	} catch (error) {
		console.log("post('/') error",error)
	}
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
		next(error)
    console.error('Error fetching blog by id:', error);
    response.status(400).json({ error: 'malformatted id' });
  }
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	}

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter