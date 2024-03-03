import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm.jsx'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable.jsx'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      console.log("blogs", blogs)
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log("local storage updated", user, user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.createBlog(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`${returnedBlog.title} by ${returnedBlog.author} successfully added!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const LoginForm = (props) => {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <div>
            Username
            <input
              type="text"
              value={username}
              onChange={props.handleUsernameChange}
              id="username">
            </input>
          </div>
          <div>
            Password
            <input
              type="text"
              value={password}
              onChange={props.handlePasswordChange}  //({target}) => setPassword(target.value) quicker but requires state management
              id="password">
            </input>
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )

  }

  return (
    (user === null) ?
      <div>
        <h2>Log into application</h2>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div> :
      <div>
        <h1 style={{color:"blue"}}>blogs</h1>
        <Notification message={message} />
        <p>{user.username} - sucessfully logged in!</p>
        <button type="submit" onClick={handleLogout} 
          style={{
            color:"white",
            backgroundColor: 'red'}}>logout</button>
        <Togglable buttonLabel="create a new blog">
          <NewBlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>
  )

}

export default App