import { useState } from "react"

const NewBlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
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
          Title:
          <input 
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
            id="title">
          </input>
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
            id="author">
          </input>
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
            id="url">
          </input>
        </div>
        <button type="submit" id="new-blog-button">create</button>
      </form>
  </div>)
}

export default NewBlogForm