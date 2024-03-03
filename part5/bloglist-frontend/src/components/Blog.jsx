import { useState } from "react"

const Blog = ({ blog }) => {

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

  return(
    <div style={blogStyle} >
      {visible ? (
        <div>
        <p style={textStyle}>
        {blog.title} by {blog.author}
      </p>
      <p>
        find out more: {blog.url}
      </p>
      <p>
        like: {blog.likes}
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