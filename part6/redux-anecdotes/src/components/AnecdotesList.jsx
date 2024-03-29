import { useSelector, useDispatch } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => {
    if(state.filters === null) {
      return state.anecdotes.sort((a,b) => b.votes-a.votes)
    }
    return state.anecdotes.filter( a => 
      a.content
        .toLowerCase()
        .includes(state.filters.toLowerCase())) 
        .sort((a,b) => b.votes-a.votes)
  })

  const dispatch = useDispatch()

  const vote = (anec_id, content) => {
    console.log('voted', anec_id, content)
    dispatch(addVotes(anec_id))
    dispatch(setNotification(`You voted for "${content}" !`, 5))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdotesList