const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})
  response.status(204).end()
  } catch (error) {
    console.log("cypress '/reset' error", error)
    response.status(500).send({"/reset error": error}) 
  }
})

testingRouter.get('/reset', async (request, response) => {
  return response.send(`
  <div>/reset endpoint</div>
`)
})

module.exports = testingRouter