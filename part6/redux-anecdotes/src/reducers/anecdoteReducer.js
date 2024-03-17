import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../../services/anecdotesService"

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
    upVote(state, action) {
      console.log("action",action)
      const id = action.payload.id
      const updatedAnecdote = action.payload
      console.log("updatedAnecdote",updatedAnecdote)
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

export const  {upVote, createAnecdotes, appendAnecdote, setAnecdote} = anecdotesSlice.actions
//handling async operations which then get dispatched
export const initializeAnecdotes = () => { 
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVotes = (id) => {
  return async dispatch => {
    const ua = await anecdotesService.updateAnecdote(id)
    dispatch(upVote(ua))
  }


}
// The reducer can be accessed by the noteSlice.reducer
export default anecdotesSlice.reducer