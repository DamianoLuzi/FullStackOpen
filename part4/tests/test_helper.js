const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "blog in test db 1",
    "author": "me",
    "url": "mockblogurl",
    "likes": 777
  },
  {
    "title": "blog in test db 2",
    "author": "me",
    "url": "mockblogurl",
    "likes": 777
  },
]

const nonExistingId = async () => {
  const blog = new Blog({title: "will remove this soon" })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}) 
  if(blogs.length === 0) console.log("get('/api/blogs') returns empty array",blogs)
  return blogs.map(b => b.toJSON())
}

module.exports = {
  nonExistingId,
  initialBlogs,
  blogsInDb
}