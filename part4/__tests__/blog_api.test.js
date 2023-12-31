const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("cleared the test db")
  const initialBlogsToSave = helper.initialBlogs.map(blog => {
    console.log("created new blog",blog)
    return new Blog(blog)
  })
  const savedBlogsPromiseArray = initialBlogsToSave.map(async (blog) => blog.save())
  await Promise.all(savedBlogsPromiseArray)
  console.log("done setting up test db")
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('There are 2 blogs initially', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('A valid blog can be added', async () => {
  const newBlog = {
    "title": "A new Blog",
    "author": "Luke Thompson",
    "url": "http://impressivegblog.om",
    "likes": 333
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDB()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
  const finalTitles = finalBlogs.map(blog => blog.title)
  expect(finalTitles).toContain(
    'A new Blog'
  )
})

test('Blogs can retrieved by ID', async () => {
  const newBlog = {
    "title": "A banging Blog",
    "author": "Paul Mescal",
    "url": "http://bangingblog.om",
    "likes": 444

  }
  const savedBlog = await api.post('/api/blogs').send(newBlog)
  console.log("saved blog body",savedBlog.body)
  const blogID = savedBlog.body.id
  const blogFetchedbyId = await api.get(`/api/blogs/${blogID}`)
  console.log("expected",savedBlog.body)
  console.log("fetched ",blogFetchedbyId.body)
  expect(blogFetchedbyId.body).toStrictEqual(savedBlog.body)
})

test('id property is defined', async () => {
  const addedBlog = new Blog({
    "title": "A gorgeous Blog",
    "author": "Marianne Sheridan",
    "url": "http://bangingblog.om",
    "likes": 333
  })
  const savedBlog = await addedBlog.save()
  expect(savedBlog.id).toBeDefined()
})

test('missing properties result in bad request', async () => {
  const addedBlog = new Blog({
    "author": "Marianne Sheridan",
    "url": "http://gorgeusblog.om",
    "likes": 333
  })
  const response = await api.post('/api/blogs')
  expect(response.status).toBe(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})