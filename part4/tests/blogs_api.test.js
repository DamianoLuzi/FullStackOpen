const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const api = supertest(app)

describe('blogs_api testing: 2 initially hardcoded blogs in test db', () => {
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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body.map(b => b.title)
    assert(blogs.includes('blog in test db 2'))
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
      console.log("bogs at end after failed insert", blogsAtEnd)
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    } catch (error) {
      console.log("malformatted blog error", error)
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
    assert.strictEqual(newBlogResponse.body.title, newBlog.title)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToDelete = startingBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))
  })
})

//users_api testing
describe('users_api testing: when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'single user in test db', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fresh username',
      name: 'Maria Joao Moreira',
      password: 'Obrigadissimo',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'single user in test db',
      name: 'me',
      password: 'Obrigadissimo',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique') ||
    result.body.error.includes('E11000 duplicate key error collection') ||
    result.body.error.includes('users POST error'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})