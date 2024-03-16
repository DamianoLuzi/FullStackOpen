import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
//createSlice returns an object containing the reducer 
//as well as the action creators defined by the reducers parameter
const anecdotesSlice = createSlice({
  name:'anecdote',
  initialState: initialState,
  reducers: {
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
    }
  }
})

export const  {addVotes, createAnecdotes} = anecdotesSlice.actions
// The reducer can be accessed by the noteSlice.reducer
export default anecdotesSlice.reducer



/* const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'ADD_VOTES':
      const id = action.payload.id
      const votedAnecdote = state.find(x => x.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(ancdt => 
        ancdt.id !== id ? ancdt : updatedAnecdote
      )

    case 'NEW_ANECDOTE':
      return [...state, action.payload]; 
    default:
      return state
  }
  return state[id]
}

export const addVotes = (id) => {
  return {
    type: 'ADD_VOTES',
    payload: {id}
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
    
  }
}
*/
