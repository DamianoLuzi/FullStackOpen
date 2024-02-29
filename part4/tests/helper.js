const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
/*const initialBlogs = [
    {
    "title": "My First Blog",
    "author": "Me",
    "url": "http://astonishingblog.om",
    "likes": 2222
    },
    {
      "title": "My Second Blog",
      "author": "Me Again",
      "url": "http://impressivegblog.om",
      "likes": 333
      },
  ]*/
  
  const initialBlogs = [
      {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
      },
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
      },
      {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
      },
      {
          _id: '5a422b891b54a676234d17fa',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 10,
          __v: 0
      },
      {
          _id: '5a422ba71b54a676234d17fb',
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
          likes: 0,
          __v: 0
      }
  ]
  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
  }
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb,usersInDb,
  }