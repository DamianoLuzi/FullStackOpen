const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const initialBlogs = [
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
  ]

const blogsInDB = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

test('helper dummy test', async () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


module.exports = {
    initialBlogs, blogsInDB
}