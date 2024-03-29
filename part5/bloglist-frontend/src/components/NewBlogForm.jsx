import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <p>create a new blog</p>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title">
          </input>
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          >
          </input>
        </div>
        <div >
          URL:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url">
          </input>
        </div>
        <button type="submit" id='create-button'
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer' }}>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm