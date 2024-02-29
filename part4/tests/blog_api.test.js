const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./helper')
const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

describe('testing tests',() => {
	test('1+1=2 ?', () => {
		assert.strictEqual(1,1)
	})
	test('dummy always returns 1', () => {
		const blogs = []
		const result = listHelper.dummy(blogs)
		assert.strictEqual(result,1)
	})
})

describe('total likes of hardcoded blogs', () => {
	test('total number of likes match', () => {
		const blogs = helper.initialBlogs
	const totalLikes = listHelper.totalLikes(blogs)
	assert.strictEqual(totalLikes, blogs.reduce((sum, blog) => sum + blog.likes, 0))
	})
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

after(async () => {
	await mongoose.connection.close()
})
/* beforeEach(async () => {
	await Blog.deleteMany({})
	console.log("cleared the test db")
	const initialBlogsToSave = helper.initialBlogs.map(blog => {
		console.log("created new blog", blog)
		return new Blog(blog)
	})
	const savedBlogsPromiseArray = initialBlogsToSave.map(async (blog) => blog.save())
	await Promise.all(savedBlogsPromiseArray)
	console.log("done setting up test db")
}, 5000)

test('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'David',
			name: 'Tennant',
			password: 'DoctorWho'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username does not exist', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Ssdsduper',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password and username must be given')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails with proper statuscode and message if password does not exist', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Ssdsduper',
			username: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password and username must be given')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Super',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ro',
			name: 'Sususususu',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password or username must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails with proper statuscode and message if password is less than three characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'kakakaka',
			name: 'Superkakakak',
			password: 'sa',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password or username must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})



})

after(async () => {
	await mongoose.connection.close()
}) */

