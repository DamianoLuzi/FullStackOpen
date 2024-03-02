const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://luzidami03:${password}@blogscluster.t6zrwjc.mongodb.net/blogsApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Blog added via mongo.js',
  author: 'me',
  url:'mockblogurl',
  likes: 777
})

blog.save().then(result => {
  console.log('blog saved!')
  //mongoose.connection.close()
})

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})