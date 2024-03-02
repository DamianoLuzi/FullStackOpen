const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post('/', (request, response) => {
	//const blog = new Blog(request.body)
	const body = request.body

	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	})

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
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