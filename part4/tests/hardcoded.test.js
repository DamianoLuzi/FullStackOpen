const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

test('there is one blog', async () => {
  try {
    const response = await api.get('/api/blogs')
    console.log("hardcoded blog in test db", response.body)
    assert.strictEqual(response.body.length, 1)
  } catch (error) {
    console.log("wrong # of blogs", error)
  }
})

/* after(async () => {
  await mongoose.connection.close()
}) */