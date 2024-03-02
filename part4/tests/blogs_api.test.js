const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared test db')

  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('done')
}) 

test('blogs are fetched as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    "title": "A valid blog being added to test db",
    "author": "me",
    "url": "mockblogurl",
    "likes": 777
  }

  await api   //first insterting the blog
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // status code for CREATED
    .expect('Content-Type', /application\/json/)

  //const response = await api.get('/api/blogs')
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(blog => blog.title)
  assert.strictEqual(titles.length, helper.initialBlogs.length + 1)
  assert(titles.includes('A valid blog being added to test db'))

})

test('blog with missing title insert fails', async () => {
  const nb = {
    author: "this won't be added"
  }

  try {
    await api
    .post('/api/blogs')
    .send(nb)
    .expect(400)

    //const blogs = api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()
    console.log("bogs at end after failed insert",blogsAtEnd)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  } catch (error) {
    console.log("malformatted blog error",error)
  }
  
  
})

test('blogs can be fetched by id', async () => {
  const newBlog = {
    "title": "blog added for fetching it by id",
    "author": "me",
    "url": "mockblogurl",
    "likes": 333
  }

  await api   //first insterting the blog
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // status code for CREATED
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)
  assert.strictEqual(titles.length, helper.initialBlogs.length + 1)
  assert(titles.includes('blog added for fetching it by id'))
  const newBlogId = response.body
    .filter(blog => blog.title === newBlog.title) 
    .map(blog => blog.id)
  const newBlogResponse = await api.get(`/api/blogs/${newBlogId}`)
  //console.log("new blog response fetching by id  -> ",newBlogResponse.body.title)
  assert.strictEqual(newBlogResponse.body.title,newBlog.title)
})

after(async () => {
  await mongoose.connection.close()
})