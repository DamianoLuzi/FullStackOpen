import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//createSlice returns an object containing the reducer 
//as well as the action creators defined by the reducers parameter
const anecdotesSlice = createSlice({
  name:'anecdote',
  initialState: [],
  reducers: {
    //defining actions
    addVotes(state, action) {
      console.log(action)
      const id = action.payload
      const votedAnecdote = state.find(x => x.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(ancdt => 
        ancdt.id !== id ? ancdt : updatedAnecdote
      )
    },
    createAnecdotes(state, action) {
      const newAnecdote = action.payload
      console.log(JSON.parse(JSON.stringify(state)))
      state.push({        
        content: newAnecdote, 
        id: getId(),
        votes: 0   
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const  {addVotes, createAnecdotes, appendAnecdote, setAnecdote} = anecdotesSlice.actions
// The reducer can be accessed by the noteSlice.reducer
export default anecdotesSlice.reducer