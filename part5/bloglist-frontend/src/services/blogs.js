import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createBlog = async (newBlog) => {
  try {
    //jwt authorization config
  const config = {
    headers: { Authorization: token }
  }
    const response = await axios.post(baseUrl, newBlog, config)
    console.log("post response",response)
    return response.data
  } catch (error) {
    console.log("axios.post('/') error", error)
    return response.status(500)
  }
}

export default { getAll, createBlog, setToken}