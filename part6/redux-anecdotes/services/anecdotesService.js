import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => {
  const r = 100000*Math.random()
  return r.toFixed(0)
}

const createNewAnecdote = async (content) => {
  const newAn = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, newAn)
  return response.data
}

export default {getAll, createNewAnecdote}