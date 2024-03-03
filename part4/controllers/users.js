const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  //populate() acts as a JOIN query and gets the blogs'
  //content by their id
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })  //what's among curly braces filters the result fields
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(error) {
    console.log("users post('/') error",error)
    response.status(400).json({error: 'users POST error'})
  }
})

module.exports = usersRouter