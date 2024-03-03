import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      console.log("blogs", blogs)
      setBlogs( blogs )
    } 
    fetchBlogs()   
  }, [])

  const handleLongin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log("wrong username or password", error)
    }
  }

  const handleLogout = async () => {
    setUser(null)
  } 

  return(
    (user === null) ? 
    <div>
      <h2>Log into application</h2>
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
    <p>{user.username} - sucessfully logged in!</p>
    <button type="submit" onClick={handleLogout}>logout</button>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user}/>
    )}
    </div>
  )

}

export default App