import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm.jsx'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
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
      setBlogs( blogs )
    } 
    fetchBlogs()   
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log("local storage updated",user,user.token)
    }
  },[])

  const handleLongin = async (e) => {
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

  return(
    (user === null) ? 
    <div>
      <h2>Log into application</h2>
      <Notification message={message} />
      <form onSubmit={handleLongin}>
        <div>
          Username
          <input 
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
            id="username">
          </input>
        </div>
        <div>
          Password
          <input
            type="text"
            value={password}
            onChange={({target}) => setPassword(target.value)}
            id="password">
          </input>
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div> : 
    <div>
    <h2>blogs</h2>
    <Notification message={message} />
    <p>{user.username} - sucessfully logged in!</p>
    <button type="submit" onClick={handleLogout}>logout</button>
    <NewBlogForm createBlog={addBlog}/>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user}/>
    )}
    </div>
  )

}

export default App