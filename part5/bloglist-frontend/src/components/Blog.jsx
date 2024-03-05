import { useState } from "react"

const Blog = ({ blog, addLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const textStyle = { 
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px'
  }

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    addLikes(blog.id, blogObject)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
    deleteBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle} >
      {visible ? (
        <div>
        <p style={textStyle}>
        {blog.title} by {blog.author}
        <button onClick={handleDelete}>delete</button>
      </p>
      <p>
        find out more: {blog.url}
      </p>
      <p>
        likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </p> 
      </div>
      ) :(
        <p style={textStyle}>{blog.title}</p>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
    </div> 
  ) 
}

export default Blog


//style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '5px', marginBottom: '10px', border: '1px solid green' }}